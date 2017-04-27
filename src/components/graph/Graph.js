import React from 'react'
import Axis from './sub-components/Axis'
import SubAxis from './sub-components/SubAxis'
import GraphBody from './sub-components/GraphBody'
import Pointer from './sub-components/Pointer'
import styles from './Graph.css'
import { getDate } from '../../utils'


export default class Graph extends React.Component {
  static get defaultProps() {
    const now = getDate()
    const time = [now.getHours(), (now.getMinutes() <10 ? '0' : ' ')  + now.getMinutes()]
    const currentTime = time.join(":")

    return {
      width: 4320,
      height: 460,
      now: now,
      time: currentTime
    }
  }
  constructor(props){
    super(props)

  }

  render() {
    return (
      <div className={styles.graphWrapper}>
        <div className={styles.graphCont} ref={
          (container) =>
            container && (container.scrollLeft = 1440 - ((container.getBoundingClientRect().width - 1440) / 2))}>
          <svg viewBox="0 0 4320 460" preserveAspectRatio="xMidYMin slice"
               style={{'width': '4320px', 'paddingBottom': '455px', 'height': '1px', 'overflow': 'visible'}}>
            {/*<svg viewBox="0 0 1440 460" preserveAspectRatio="xMaxYMax meet">*/}
            <Axis
              x={0}
              y={this.props.height * 0.5}
              length={this.props.width}
              horizontal={true}
              stroke={"#9B9B9B" }
            />
            <Axis
              x={this.props.width * 0.5}
              y={0}
              length={this.props.height}
              horizontal={false}
              stroke="#F91233"
            />

            <SubAxis
              x={0}
              y={this.props.height * 0.5 - 10}
              length={this.props.width }
            />
            <GraphBody
              x={this.props.width * 0.5}
              y={this.props.height * 0.5}
              time={this.props.now}
              data={this.props.derivatives}
              onUnreconBubbleClick={this.props.onUnreconBubbleClick}
            />
            <Pointer
              xrec={this.props.width * 0.5 -50} //670
              yrec={0}
              recwidth={((this.props.width / 3)-240) / 12} //100
              recheight={20}
              xtext={this.props.width * 0.5 - 17.5} //680
              ytext={15}
              triangle1={"2150,20 2170,20 2160,30"}
              triangle2={"2160,450 2150,460 2170,460"}
              color="#F91233"
              text= {this.props.time}
            />
          </svg>
        </div>
        <div className={styles.moneyIcon + " " + styles.moneyOutIcon}>OUT</div>
        <div className={styles.moneyIcon + " " + styles.moneyInIcon}>IN</div>
      </div>
    )
  }
}
