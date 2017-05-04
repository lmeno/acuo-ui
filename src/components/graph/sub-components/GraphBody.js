import React from 'react';
import { List, Set, Map } from 'immutable'
import styles from '../Graph.css'
import { hashHistory } from 'react-router'
import {checkNegative} from '../../../utils'

export default class GraphBody extends React.Component {

  constructor(props){
    super(props)
    this.getDeriv = this.getDeriv.bind(this)
  }

  whichClickFuncToRun(status, lastUpdatedTime, bubbleTimeStart, timeDifference, onUnreconBubbleClick){
    switch(status){
      case 'expected':
        return () => {
          hashHistory.push('/recon')

          //1st param: time range start
          //2nd param: time range start + 1 hour
          //3rd param: getDay() returns 'today', 'tomorrow', 'yesterday' based on summation of
          //           today's hours + the difference in time of the bubble, appends it with
          //           the 'hours' portion of time start to form a string for dispatch use
          onUnreconBubbleClick(
            bubbleTimeStart,
            (new Date(bubbleTimeStart).setHours((new Date(bubbleTimeStart).getHours()+1))),
            this.getDay(new Date(Date.parse(lastUpdatedTime)).getHours() + timeDifference) + ': ' + (new Date(bubbleTimeStart).getHours()) + ':00 HRS',
            'Expected'
          )
        }
      case 'unrecon':
        return () => {
          hashHistory.push('/recon')

          //1st param: time range start
          //2nd param: time range start + 1 hour
          //3rd param: getDay() returns 'today', 'tomorrow', 'yesterday' based on summation of
          //           today's hours + the difference in time of the bubble, appends it with
          //           the 'hours' portion of time start to form a string for dispatch use
          onUnreconBubbleClick(
            bubbleTimeStart,
            (new Date(bubbleTimeStart).setHours((new Date(bubbleTimeStart).getHours()+1))),
            this.getDay(new Date(Date.parse(lastUpdatedTime)).getHours() + timeDifference) + ': ' + (new Date(bubbleTimeStart).getHours()) + ':00 HRS',
            'Unrecon'
          )
        }
      case 'reconciled':
        return () => hashHistory.push('/pledge')
      case 'pledged':
        return () => hashHistory.push('/deployed')
      case 'dispute':
        return () => hashHistory.push('/disputes')
      case 'actiondispute':
        return () => hashHistory.push('/disputes')
    }
  }

  getDay(hrs){
    switch(true){
      case (hrs > 23):
        return 'tomorrow'
      case (hrs < 0):
        return 'yesterday'
      default:
        return 'today'
    }
  }

  getCircle(lastUpdatedTime, onUnreconBubbleClick){
    let status = this.getDeriv().reduce((setX, x) => {
      return setX.union(x.get('marginStatus').map(y => y.get('status')))
    }, Set()).toList()

    let possibleTimes = this.getDeriv().reduce((setX, x) => {
      return setX.union(x.get('marginStatus').reduce((setY, y) => {
        return setY.union(y.get('timeFrames').map(z => z.get('timeRangeStart')))
      }, Set()))
    }, Set()).toList()

    let graphXY = status.map(x => Map({"status": x, "timeFrames": possibleTimes.map(y => Map({"timeFrame": y, "actionsLists": List()}))}))

    console.log(graphXY.toJS())

    return graphXY.map(X => {
      return Map({"status": X.get('status'), "timeFrames":
        X.get('timeFrames').map(Y => {
          return Map({"timeFrame": Y.get('timeFrame'), "actionsList": this.getDeriv().reduce((setX, x) => {
            return setX.concat(x.get('marginStatus').reduce((setY, y) => {
              if(y.get('status') == X.get('status')){
                return y.get('timeFrames').filter(z => {
                  return z.get('timeRangeStart') == Y.get('timeFrame')
                })
              }else
                return setY
            }, List()))
          }, List())
        })
        })
      })
    }).map(x => {
      return x.set('timeFrames', x.get('timeFrames').map(y => {
        return Map({'timeFrame': y.get('timeFrame'),
            "inAmount": y.get('actionsList').reduce((a, z) => {
            return a + z.get('actionsList').reduce((a2, xx) => {

              const amount = Math.abs((parseFloat(xx.get('initialMargin')) || 0.00) + (parseFloat(xx.get('variableMargin'))  || 0.00))

              return (xx.get('direction') == 'IN' ? parseFloat(a2) + parseFloat(amount) : a2)
            }, 0)
          }, 0)
          , "outAmount": y.get('actionsList').reduce((a, z) => {
            return a + z.get('actionsList').reduce((a2, xx) => {

              //abs(IM + VM)
              const amount = Math.abs((parseFloat(xx.get('initialMargin')) || 0.00) + (parseFloat(xx.get('variableMargin'))  || 0.00))

              return (xx.get('direction') == 'OUT' ? parseFloat(a2) + parseFloat(amount) : a2)
            }, 0)
          }, 0)
          , "inNo":  y.get('actionsList').reduce((a, z) => {
            return a + z.get('actionsList').reduce((a2, xx) => {

              return (xx.get('direction') == 'IN' ? a2+1 : a2)
            }, 0)
          }, 0)
          , "outNo":  y.get('actionsList').reduce((a, z) => {
          // console.log('a ' + a)
            return a + z.get('actionsList').reduce((a2, xx) => {
              // console.log(xx.get('direction'))
              return (xx.get('direction') == 'OUT' ? a2+1 : a2)
            }, 0)
          }, 0)
        })
      }))
    }).map(x => {
      return  x.set('timeFrames', x.reduce(), Map({}))
    }).map((status) => {
      return status.get('timeFrames').map(timeFrame => {

        let colour = this.getColour(status.get('status').toLowerCase())
        let timeDifference = (Date.parse(new Date(timeFrame.get('timeFrame'))) - (Date.parse(lastUpdatedTime)))/3600000

        // Use a faded blue for pledge if it's past the current time
        if (status.get('status') == 'pledge' && timeDifference < 0) {
          colour[0] = "#8CC5DD"
        }

        const onClickFunc = this.whichClickFuncToRun(status.get('status').toLowerCase(), lastUpdatedTime, timeFrame.get('timeFrame'), timeDifference, onUnreconBubbleClick)

        return List()
        .push((timeFrame.get('inAmount') === 0)? 0 :
          <g id={styles.componentId} key={status.get('status') + timeFrame.get('timeFrame') + 'in'}>
            <circle cx={this.props.x + (timeDifference + 0.5) * 60}
                    cy={colour[2]}
                    r={(timeFrame.get('inAmount') === 0)? 0 :(Math.log(timeFrame.get('inAmount'))) }
                    fill={colour[0]}>
            </circle>
            <g className={styles.toolTip} opacity="0.9">

              <rect x={(timeFrame.get('inAmount') > 100000000 || status.get('status').length >= 7)
                ? this.props.x - 120 + (timeDifference + 0.5) * 60
                : this.props.x - 90 + (timeDifference + 0.5) * 60}
                    y={colour[2] - 20} rx="4"
                    width={(timeFrame.get('inAmount') > 100000000 || status.get('status').length >= 7) ? 120 : 90}
                    height="45" strokeWidth="1" stroke={colour[0]} fill="#FFFFFF"></rect>
              <text x={this.props.x - 12 + (timeDifference + 0.5) * 60} y={colour[2] - 2.5}
                    fontSize="11"
                    fontFamily="helvetica"
                    fontWeight="bold"
                    fill="#010101"
                    textAnchor="end">
                {timeFrame.get('inNo')} {(status.get('status').toUpperCase() == 'ACTIONDISPUTE' ? 'DISPUTE' : status.get('status').toUpperCase())}
              </text>
              <text x={this.props.x - 12 + (timeDifference + 0.5) * 60} y={colour[2] + 17.5}
                    fontSize="13"
                    fontFamily="helvetica"
                    fill="#010101"
                    textAnchor="end">
                {checkNegative(timeFrame.get('inAmount').toFixed(2))}
              </text>
            </g>
          </g>)
          .push((timeFrame.get('outAmount') === 0)? 0 :
            <g id={styles.componentId} key={status.get('status') + timeFrame.get('timeFrame') + 'out'}
               onClick={onClickFunc}>
              <circle cx={this.props.x + (timeDifference + 0.5) * 60}
                      cy={colour[1]}
                      r={(timeFrame.get('outAmount') === 0)? 0 :(Math.log(timeFrame.get('outAmount'))) }
                      fill={colour[0]}>
              </circle>
              <g className={styles.toolTip} opacity="0.9">
                <rect x={(timeFrame.get('outAmount') > 100000000 || status.get('status').length >= 7)
                  ? this.props.x - 120 + (timeDifference + 0.5) * 60
                  : this.props.x - 90 + (timeDifference + 0.5) * 60}
                      y={colour[1] - 20}
                      rx="4"
                      width={(timeFrame.get('outAmount') > 100000000 || status.get('status').length >= 7) ? 120 : 90}
                      height="45"
                      strokeWidth="1"
                      stroke={colour[0]}
                      fill="#FFFFFF"></rect>
                <text x={this.props.x - 12 + (timeDifference + 0.5) * 60}
                      y={colour[1] - 2.5}
                      fontSize="11"
                      fontFamily="helvetica"
                      fontWeight="bold"
                      fill="#010101"
                      textAnchor="end">
                  {timeFrame.get('outNo')} {(status.get('status').toUpperCase() == 'ACTIONDISPUTE' ? 'DISPUTE' : status.get('status').toUpperCase())}
                </text>
                <text x={this.props.x - 12 + (timeDifference + 0.5) * 60}
                      y={colour[1] + 17.5}
                      fontSize="13"
                      fontFamily="helvetica"
                      fill="#010101"
                      textAnchor="end">
                  {checkNegative(timeFrame.get('outAmount').toFixed(2))}
                </text>
              </g>
            </g>)
      })
    }).reduce((set, x) => {
      return set.concat(x.reduce((setY, y) => {
        return setY.concat(y.reduce((listZ, z) => {
          return listZ.push(z)
        }, List()))
      }, List()))
    }, List())

  }

  /**
   * Function to specify colour and both y values of circle
   * @param status
   * @returns {[string,number,number]}
   */
  getColour(status){

    switch(status){
      case 'expected':
        return ['#F7BD20', 42, 418]
      case 'unrecon':
        return ["#D65028", 82, 378]
      case 'reconciled':
        return ["#005544", 122, 338]
      case 'pledged':
        return ["#0170B0", 162, 298]
      case 'dispute':
        return ["#D0011B", 202, 258]
      case 'actiondispute':
        return ["#D0011B", 202, 258]
      default:
        return ["#D0011B", -100, -100]
    }

  }

  getDeriv(){
    return this.props.data || []
  }
  render() {

    const { time, onUnreconBubbleClick } = this.props

    return(
      <svg>
        {this.getCircle(time, onUnreconBubbleClick).map(x => x)}
      </svg>
    )
  }
}
