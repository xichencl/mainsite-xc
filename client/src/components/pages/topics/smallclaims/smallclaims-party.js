import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStages, fetchResourceLinks } from '../../../../actions/content.js';
import { storeStageId } from '../../../../actions/content.js';

import TitleLine from '../../../template/title-line';

import TextIconBox from '../../../template/text-icon-box';
import ChecklistIcon from '../../../../img/icn_checklist.svg';
import InfoBox from '../../../template/info-box';
import AccordionBoxContainer from '../../../template/accordion-box/accordion-box-container';
import SquareBox from '../../../template/square-box';
//temporarily porting in bot here and on /smallclaims. eventually bring outside of topics pages
import Bot from '../../../chatbot/Bot.jsx'; 
import { DEFAULT_LANG } from '../../../../actions/types';

class SmallClaimsParty extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	buttonSelected: false,
		// 	stageTitle: '',
    //  stageId: null
		// }
		// this.onStageSelect = this.onStageSelect.bind(this);
	}

  componentWillMount() {
    this.props.stages.length === 0 && this.props.fetchStages();
    this.props.resources.length === 0 && this.props.fetchResourceLinks("SmallClaims");

  }

  filterStageButtons() {  
  }

	render() {
    const lang = this.props.language;
		const resources = this.props.resources.map((item) => {
			return (
				<div key={item.resourceId}>
          {/*unavailable translations now default to 'en-US'*/}
					<a href={item.url} target="_blank">{item.titles[lang] || item.titles['en-US']}</a>
				</div>
			)
		})

    const partyIds = {
      plaintiff: '2zYmskK1EUW22uukow4CaU',
      defendant: 'mI8A9AawXACAmYEmSyU0g'
    }

    const renderedStages = this.props.stages.map((stage) => {
      const currentParty = this.props.match.params.party;
      console.log(currentParty, stage, '====currentParty')
      return (
        <div  className={stage.partyLabel['en-US']  === 'all' || stage.partyLabel['en-US'] === currentParty ? "Square-box-container " : "Square-box-container hidden"} key={stage.id}>
         <Link to={`${this.props.match.url}/${stage.url}`}>
           <SquareBox
             id={stage.id}
             boxTitle={stage.titles[lang]}
             assetId={stage.imageId}
           />
         </Link>
       </div> 
      )
    })

		return (
  		<div>
        <Bot />
  			<TitleLine title="Small Claims" />
        <div className="grid grid-pad">
          {renderedStages}
        </div>

        <TitleLine title="More Resources" />
        <div className="grid grid-pad">  
          <TextIconBox 
        		boxTitle="Small Claims Checklist"
        		boxContent="Use our interactive checklist to help you manage your small claims case before you file, during your case, and after a judgement has been made."
        		iconLarge={ChecklistIcon}
        		TextIconBoxClass="Box Text-icon-box Blue-border Grey-background medium-box"
        		buttonLink="/checklist"
            caseType='smallClaims'
            party={this.props.match.params.party}
      		/>
        	<InfoBox 
        		boxTitle="Resource Links"
        		boxContent={resources}
        		buttonVisibilityClass="hidden"
        		infoboxClass="Box Info-box small-box col-2"
        		/>
        </div>
	    </div>
		)
  } 
}

function mapStateToProps(state) {
  return { 
    stages: state.content.stages,
    // stageId: state.content.stageId,
    resources: state.content.resources,
    language: state.content.language
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchStages, fetchResourceLinks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallClaimsParty);
