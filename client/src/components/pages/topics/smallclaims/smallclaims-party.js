import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStages } from '../../../../actions/content.js';
import TitleLine from '../../../template/title-line';

import TextIconBox from '../../../template/text-icon-box';
import ChecklistIcon from '../../../../img/icn_checklist.svg';
import InfoBox from '../../../template/info-box';
import AccordionBoxContainer from '../../../template/accordion-box/accordion-box-container';
import SquareBox from '../../../template/square-box';
import before from '../../../../img/before_1.svg';
import during from '../../../../img/during_1.svg';
import after from '../../../../img/after_1.svg';
//temporarily porting in bot here and on /smallclaims. eventually bring outside of topics pages
import Bot from '../../../chatbot/Bot.jsx';

const resourceList = [
  { 
    title: "Small Claims Advisor",
    link: "http://www.courts.ca.gov/selfhelp-advisors.htm"
  },
  { 
    title: "California Department of Consumer Affairs",
    link: "http://www.dca.ca.gov/publications/small_claims/index.shtml"
  },
  { 
    title: "Find a Law Library",
    link: "http://www.publiclawlibrary.org/law-libraries/"
  },
  { 
    title: "Videos",
    link: "https://www.youtube.com/watch?v=wZ491ri0E74&list=PLnMJyjNWwPW7RCLl0kmdMuOkpAHGMbYnn"
  },
] 	 

class SmallClaimsParty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonSelected: false,
			stageTitle: '',
      stageId: null
		}
		this.onStageSelect = this.onStageSelect.bind(this);
	}

  componentWillMount() {
    this.props.fetchStages()
  }

	onStageSelect(title, id, e) {
		console.log(id)
		e.stopPropagation();
		this.setState({
			buttonSelected: true,
			stageId: id, 
      stageTitle: title
		})
	}

	renderLinks() {
		//if button hasn't been clicked, show three button options
    if (!this.state.buttonSelected) {
      console.log("false", this.state)
      const renderedButtons = this.props.content.map((stage, index) => {
      	return (
      	<div onClick={(e) => this.onStageSelect(stage.fields.title, stage.sys.id, e)} key={stage.sys.id}>
      		<SquareBox
      			id={stage.sys.id}
            boxTitle={stage.fields.title}
      			assetId={stage.fields.image.sys.id}
      		/>
      	</div> 
      	)
  		})

      return [
      	<div>{renderedButtons}</div>
      ];
    } else {
    	console.log("true", this.state)
    	const renderedLinks = this.props.content.map((stage, index) => {
    		// if (button.id == this.state.stage) {
    		// }
      	return (
        	<div onClick={(e) => this.onStageSelect(stage.fields.title, stage.sys.id, e)} key={stage.sys.id}>
        		<a>{stage.fields.title}</a>
        	</div>
      	)
  		})
      return [
        // show selected stage content and menu with stage highlighted 
        // put this in a separate component, and pass state as props
        <div className="grid-pad">
{/*        	<div>{this.state.stageTitle} accordion box here</div>
*/}      		
          <AccordionBoxContainer />
          <InfoBox 
      			boxTitle={`Menu - ${this.state.stageTitle}`}
      			boxContent={renderedLinks}
      			buttonVisibilityClass="hidden"
      			infoboxClass="Box Info-box small-box col-2"
      		/>
        </div>
      ];
    }
  }

	render() {
		const resources = resourceList.map((item) => {
			return (
				<div>
					<a href={item.link} target="_blank">{item.title}</a>
				</div>
			)
		})
		
		//show links here: filter by if clicked, show the side menu. otherwise show icons
		return (
  		<div>
        <Bot />
  			<TitleLine title="Small Claims" />
        <div className="grid grid-pad">
        	{/*<Link to="checklist">*/}
            <TextIconBox 
          		boxTitle="Small Claims Checklist"
          		boxContent="Use our interactive checklist to help you manage your small claims case before you file, during your case, and after a judgement has been made."
          		iconLarge={ChecklistIcon}
          		TextIconBoxClass="Box Text-icon-box Grey-background medium-box"
          		buttonLink="/checklist"
              caseType='smallClaims'
              party={this.props.match.params.party}
        		/>
          {/*</Link>*/}
        	<InfoBox 
        		boxTitle="Resources"
        		boxContent={resources}
        		buttonVisibilityClass="hidden"
        		infoboxClass="Box Info-box small-box col-2"
        		/>


        	{this.renderLinks()}
        
        </div>
	    </div>
		)
  } 
}


function mapStateToProps(state) {
  return { content: state.content.stages };
}

export default connect(mapStateToProps, { fetchStages })(SmallClaimsParty);



