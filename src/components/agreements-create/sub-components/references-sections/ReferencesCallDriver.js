import React from 'react'
import Dropdown from '../../../Dropdown/Dropdown'
import ToggleSwitch from '../../../common/ToggleSwitch'
import MultipleSelection from '../../../MultipleSelection/MultipleSelection'
import styles from '../ContentBody.css'
import Select from 'react-select'// react-select using styles from src/static/react-select/react-select.css
import countryList from './../../../../constants/Countries'



export default class ReferencesCallDriver extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCallDriverExpanded: true,
      isStpAutoPledge: false,
      isStpTypeCurrency: false,
      isStpAutoPledgeAccept: false,
      isStpAcceptCurrency: false,
      pledgeSTPCurrency: [],
      accountBaseCurrency: [],
      eligibleCurrency: [],
      pledgeAcceptSTPCurrency: []
    }

    this.onDropdownPledgeStpType = this.onDropdownPledgeStpType.bind(this)
    this.onDropdownPledgeAcceptStpType = this.onDropdownPledgeAcceptStpType.bind(this)
    this.pledgeSTPCurrencyChange = this.pledgeSTPCurrencyChange.bind(this)
    this.accountBaseCurrencyChange = this.accountBaseCurrencyChange.bind(this)
    this.eligibleCurrencyChange = this.eligibleCurrencyChange.bind(this)
    this.pledgeAcceptSTPCurrencyChange = this.pledgeAcceptSTPCurrencyChange.bind(this)
  }

  pledgeSTPCurrencyChange(val) {
    this.setState({
      pledgeSTPCurrency: val
    })
  }

  accountBaseCurrencyChange(val){
    this.setState({
      accountBaseCurrency: val
    })
  }

  eligibleCurrencyChange(val){
    this.setState({
      eligibleCurrency: val
    })
  }

  pledgeAcceptSTPCurrencyChange(val) {
    this.setState({
      pledgeAcceptSTPCurrency: val
    })
  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  onDropdownPledgeStpType(e) {
    this.setState({isStpTypeCurrency: (e.target.textContent == 'CURRENCY')})
  }

  onDropdownPledgeAcceptStpType(e) {
    this.setState({isStpAcceptCurrency: (e.target.textContent == 'CURRENCY')})
  }

  render() {
    const {
      propIsSubMenu,
      propPostfixLabel,
      propIsRemoveExposure,
      propShowMarginTypeDropdown
    } = this.props

    return (
      <div>
        <div className={styles.rowGroup}>
          <div className={styles.line}>
            <span className={styles.agreementsSectionHeader}>
              Call Driver Details
              {propPostfixLabel}
              </span>
            <span className={this.state.isCallDriverExpanded
              ? styles.upArrow : styles.downArrow}
                  onClick={() => this.setState({
                    isCallDriverExpanded: !this.state.isCallDriverExpanded
                  })}/>
          </div>
        </div>

        {
          this.state.isCallDriverExpanded &&
          <div className={styles.flexCont}>
            <div className={styles.agreementsSectionLeft}>
              Shared Details
              <hr/>

              {propIsSubMenu && !propIsRemoveExposure && propShowMarginTypeDropdown &&

              <div className={styles.rowGroup}>
                <div className={styles.line}>Initial Margin Type</div>
                <div className={styles.line}>
                  <div className={styles.dropDown}>
                    <Dropdown
                      handlerOnClick={this.toggleDropDown}
                      handleOnSelectedItemChange={this.onDropdownItemChange}
                      selectedOption={'Select'}
                      options={['Select', 'Regulatory', 'Non Regulatory']}
                      activateMouseLeaveEvent/>
                  </div>
                </div>
              </div>}

              {propIsSubMenu && !propIsRemoveExposure &&

              <div className={styles.rowGroup}>
                <div className={styles.line}>Exposure Treatment</div>
                <div className={styles.line}>
                  <div className={styles.dropDown}>
                    <Dropdown
                      handlerOnClick={this.toggleDropDown}
                      handleOnSelectedItemChange={this.onDropdownItemChange}
                      selectedOption={'Select'}
                      options={['Select', 'WIP']}
                      activateMouseLeaveEvent/>
                  </div>
                </div>
              </div>}

              <div className={styles.rowGroup}>
                <div className={styles.line}>Account Base Currency</div>
                <div className={styles.line}>
                  <div className={styles.dropDown}>
                    <Select
                      value={this.state.accountBaseCurrency}
                      options={countryList.get()}
                      onChange={this.accountBaseCurrencyChange}
                      multi={true}/>
                  </div>
                </div>
              </div>


              {!propIsSubMenu &&
              <div className={styles.rowGroup}>
                <div className={styles.line}>Eligible Currency</div>
                <div className={styles.line}>
                  <div className={styles.dropDown}>
                    {/*<MultipleSelection*/}
                      {/*handlerOnClick={this.toggleDropDown}*/}
                      {/*handleOnSelectedItemChange={this.onDropdownItemChange}*/}
                      {/*selectedOption={'Select'}*/}
                      {/*options={['GBP', 'SGD', 'USD', 'CNY', 'TWD', 'HKD', 'JPY']}*/}
                      {/*activateMouseLeaveEvent/>*/}
                    <Select
                      value={this.state.eligibleCurrency}
                      options={countryList.get()}
                      onChange={this.eligibleCurrencyChange}
                      multi={true}/>
                  </div>
                </div>
              </div>

              }

            </div>

            <div className={propIsSubMenu
              ? styles.agreementsSectionRightFlexTwo : styles.agreementsSectionRight}>
              Local Details
              <hr/>

              <div className={propIsSubMenu && styles.stpTwoUnits}>
                <div className={styles.flexColumn + ' ' +
                (propIsSubMenu && styles.stpAutoOne)}>
                  <div className={styles.rowGroup}>
                    <div className={styles.line + ' ' + styles.flexLine}>
                      <ToggleSwitch propIsOn={this.state.isStpAutoPledge}
                                    propOnToggle={() => this.setState({isStpAutoPledge: !this.state.isStpAutoPledge})}/>
                      &nbsp;STP Auto Pledge
                    </div>
                  </div>

                  {this.state.isStpAutoPledge &&
                  <div className={styles.flexColumn}>
                    <div className={styles.rowGroup}>
                      <div className={styles.line}>Pledge STP Call Type</div>
                      <div className={styles.line}>
                        <div className={styles.dropDown}>
                          <Dropdown
                            handlerOnClick={this.toggleDropDown}
                            handleOnSelectedItemChange={this.onDropdownItemChange}
                            selectedOption={'Select'}
                            options={['Select', 'WIP']}
                            activateMouseLeaveEvent/>
                        </div>
                      </div>
                    </div>

                    <div className={styles.rowGroup}>
                      <div className={styles.line}>Pledge STP Type</div>
                      <div className={styles.line}>
                        <div className={styles.dropDown}>
                          <Dropdown
                            handlerOnClick={this.toggleDropDown}
                            handleOnSelectedItemChange={this.onDropdownPledgeStpType}
                            selectedOption={'Select'}
                            options={['Select', 'Currency', 'Tri-Party']}
                            activateMouseLeaveEvent/>
                        </div>
                      </div>
                    </div>

                    {this.state.isStpTypeCurrency &&
                    <div className={styles.rowGroup}>
                      <div className={styles.line}>Pledge STP Currency</div>
                      <div className={styles.line}>
                        <div className={styles.dropDown}>
                          <Select
                            value={this.state.pledgeSTPCurrency}
                            options={countryList.get()}
                            onChange={this.pledgeSTPCurrencyChange}
                            multi={true}/>
                        </div>
                      </div>
                    </div>}
                  </div>}

                </div>

                <div className={styles.flexColumn + ' ' +
                (propIsSubMenu && styles.stpAutoTwo)}>
                  <div className={styles.rowGroup}>
                    <div className={styles.line + ' ' + styles.flexLine}>
                      <ToggleSwitch propIsOn={this.state.isStpAutoPledgeAccept}
                                    propOnToggle={() =>
                                      this.setState({
                                        isStpAutoPledgeAccept: !this.state.isStpAutoPledgeAccept
                                      })}/>
                      &nbsp;STP Auto Pledge Accept
                    </div>
                  </div>

                  {this.state.isStpAutoPledgeAccept &&
                  <div className={styles.flexColumn}>
                    <div className={styles.rowGroup}>
                      <div className={styles.line}>Pledge Accept STP Call Type</div>
                      <div className={styles.line}>
                        <div className={styles.dropDown}>
                          <Dropdown
                            handlerOnClick={this.toggleDropDown}
                            handleOnSelectedItemChange={this.onDropdownItemChange}
                            selectedOption={'Select'}
                            options={['Select', 'WIP']}
                            activateMouseLeaveEvent/>
                        </div>
                      </div>
                    </div>

                    <div className={styles.rowGroup}>
                      <div className={styles.line}>Pledge Accept STP Type</div>
                      <div className={styles.line}>
                        <div className={styles.dropDown}>
                          <Dropdown
                            handlerOnClick={this.toggleDropDown}
                            handleOnSelectedItemChange={this.onDropdownPledgeAcceptStpType}
                            selectedOption={'Select'}
                            options={['Select', 'Currency', 'Tri-Party']}
                            activateMouseLeaveEvent/>
                        </div>
                      </div>
                    </div>

                    {this.state.isStpAcceptCurrency &&
                    <div className={styles.rowGroup}>
                      <div className={styles.line}>Pledge Accept STP Currency</div>
                      <div className={styles.line}>
                        <div className={styles.dropDown}>
                          <Select
                            value={this.state.pledgeAcceptSTPCurrency}
                            options={countryList.get()}
                            onChange={this.pledgeAcceptSTPCurrencyChange}
                            multi={true}/>
                        </div>
                      </div>
                    </div>}

                  </div>}

                </div>

              </div>

            </div>

          </div>
        }
      </div>

    )
  }
}