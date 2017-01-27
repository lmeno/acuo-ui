import {connect} from 'react-redux'
import _ from 'lodash'
import {FilterBarReconPageComponent} from '../components'
import { Set, Map, List, fromJS } from 'immutable'
import filterItems from '../utils/filterItems'

const mapStateToProps = state => {
  const filters = state.ReconReducer.get('filters').toJS()
  const items   = state.ReconReducer.get('items').toJS()

  const outItems = _.filter(items, ['direction', 'OUT'])
  const filteredOutItems = filterItems(outItems, filters)

  const filterWithOptions = _.map(filters, filter => {
    const options = (_.get(filter, 'type', 'non-multi') === 'multi')
                    // if it is multi-value filter
                    ? _.uniq(_.map(outItems, filter.attr))
                    // if it is single-value filter
                    : _.uniq(_.map(filteredOutItems, filter.attr))
    return _.set(filter, 'options', options)
  })

  return {
    filters: _.orderBy(filterWithOptions, 'order'),
  }
}

const getYesterday = (currTime) => {
  const currTimeNew = new Date(currTime)
  return convertDate(currTimeNew, -1)
}

const getTomorrow = (currTime) => {
  const currTimeNew = new Date(currTime)
  return convertDate(currTimeNew, 1)
}

const getToday = (currTime) => {
  const currTimeNew = new Date(currTime)
  return convertDate(currTimeNew, 0)
}

const getDayAfter = (currTime) => {
  const currTimeNew = new Date(currTime)
  return convertDate(currTimeNew, 2)
}

const convertDate = (time, days) => {
  return new Date(new Date(new Date(time.setDate(time.getDate() + days))).setHours(0,0,0,0)).getTime()
}

const computeTimeWindowList = (state, currTime = '2017-01-13T08:00:00.000Z') => {

  //get current date, yesterday, tomorrow
  const yesterdayUnix = getYesterday(currTime)
  const tomorrowUnix = getTomorrow(currTime)
  const todayUnix = getToday(currTime)
  const dayAfterUnix = getDayAfter(currTime)

  const derivatives = state.getIn(['data', 'derivatives']) || List()

  const listOfDays = fromJS([
    {
      "day": "yesterday",
      "minTime": yesterdayUnix,
      "maxTime": todayUnix,
      "times": []
    },
    {
      "day": "today",
      "minTime": todayUnix,
      "maxTime": tomorrowUnix,
      "times": []
    },
    {
      "day": "tomorrow",
      "minTime": tomorrowUnix,
      "maxTime": dayAfterUnix,
      "times": []
    }
  ])

  const something = listOfDays.map((days) => {

    return days.set('times', derivatives.reduce((list, type) => {

      const someList = type.get('marginStatus').reduce((set, status) => {

        return set.union(status.get('timeFrames').reduce((set, timeFrames) => {
          const unixTime = new Date(timeFrames.get('timeRangeStart')).getTime()
          const unixEndTime = new Date(timeFrames.get('timeRangeEnd')).getTime()

          if(unixTime >= days.get('minTime') && unixTime < days.get('maxTime'))
            return set.add(fromJS({'min': unixTime, 'max': unixEndTime}))
          else
            return set
        }, Set()))

      }, Set())

      return list.union(someList)
    }, Set()).toList().sort())
  })

  return something.toJS()
}

const computeCptyEntity = (state) => {

  let cptyEntityFilter = state.getIn(['inputs', 'filters', 'cptyEntityFilter', 'filter']) || Set()
  let cptyOrgFilter = state.getIn(['inputs', 'filters', 'cptyOrgFilter', 'filter'])

  let derivatives = state.getIn(['data', 'derivatives'])
  let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
  let cptyEntityList = derivativeList.reduce((listSum, x) => {
    if (cptyOrgFilter && cptyOrgFilter != 'All') {
      return (!listSum.includes(x.cptyEntity) && x.cptyOrg == cptyOrgFilter ? listSum.add(x.cptyEntity) : listSum)
    } else {
      return (!listSum.includes(x.cptyEntity) ? listSum.add(x.cptyEntity) : listSum)
    }
  }, Set()).sort()

  if (cptyEntityFilter.size > 0)
    return cptyEntityList.filter(x =>
      cptyEntityFilter.includes(x)
    ).toOrderedSet().sort().union(cptyEntityList.filter(x =>
      !cptyEntityFilter.includes(x)
    ).toOrderedSet().sort()).toArray()
  else
    return cptyEntityList.toArray()
}

const mapDispatchToProps = dispatch => ({
  // use this function to dispatch an action to set filter
  // value here should be array with objects like {name, options, selected(str/[])}
  setFilter: (value) => dispatch({
    type: 'RECON_FILTER_SET',
    value,
  }),

  onLegalEntityChange: (text) => {
    console.log(text)
    // dispatch(filterStateLegal(e.currentTarget.dataset.ref))
  },

  onDerivChange: (e) => {
    e.stopPropagation()
    dispatch(filterStateDeriv(e.currentTarget.dataset.ref))
  },

  onStatusChange: (e) => {
    e.stopPropagation()
    dispatch(filterStateStatus((e.currentTarget.dataset.ref).toLowerCase()))
  },

  onCptyOrgChange: (e) => {
    e.stopPropagation()
    dispatch(filterCptyOrg(e.currentTarget.dataset.ref))
  },

  onCPTYEntityChange: (entityList, e) => {
    //e.stopPropagation()
    dispatch(filterCptyEntity(entityList))
  },

  onFilterTimeWindowStatus: (timeWindowMin, timeWindowMax, timeRangeText) => {
    dispatch(filterTimeWindowStatus(timeWindowMin, timeWindowMax, timeRangeText))
  }
})


const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBarReconPageComponent)

export default FilterContainer
