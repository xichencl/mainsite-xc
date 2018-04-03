import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchForms } from '../../../actions/content';
import TitleLine from '../../template/title-line';
import AccordionBox from '../../template/accordion-box/accordion-box-container'
const ReactMarkdown = require('react-markdown')

const pageNames = {
	general: "General Forms",
	smallclaims: "Small Claims Forms",
	dv: "Domestic Violence Forms",
	guardianship: "Guardianship Forms",
	traffic: "Traffic Forms",
	eviction: "Eviction Forms",
	family: "Family Forms",
	"reclamos-menores": "Formularios de reclamos menores",
	dv: "Formularios de violencia doméstica",
	"ley-familiar": "Formularios de Ley Familiar",
	desalojo: "Formularios de desalojo",
	"tutela-de-menores": "Formas de tutela de menores",
	trafico: "Formularios de tráfico",
	"fee-waivers": "Fee Waiver Forms"
}

class FormsPageSelected extends Component {
	constructor() {
		super()
		this.state = {
			activeId: 0,
			pressed: false
		}
		this.toggleClass = this.toggleClass.bind(this);
	}

	toggleClass(id) {
		this.setState({ 
			activeId: id,
			pressed: !this.state.pressed 
		});
  }


	componentWillMount() {
		const label = this.props.match.params.page
		this.props.fetchForms(label)
	}

	

	render() {

		const lang = this.props.language;
		const renderedContent = this.props.forms.map((form) => {
			return (
				<div className="Accordion-box-item " key={form.fields.id[lang]} >
				

					<h3 onClick={() => this.toggleClass(form.fields.id[lang])} className={this.state.activeId == form.fields.id[lang] && this.state.pressed == true ? "blue-font": " "} >
            {form.fields.title[lang]}
            <span className="Accordion-box-icon">
              {this.state.activeId == form.fields.id[lang] && this.state.pressed == true ? "-" : "+"}
            </span>
          </h3>

          <div className={this.state.activeId == form.fields.id[lang] && this.state.pressed == true ? " ": "hidden"}> 
						<div className="Accordion-box-content">
							<ReactMarkdown source={form.fields.blockText[lang]} />
						</div>
					</div>
				
					
					<hr className="Accordion-box-line" />
				</div>


			)    
		})
			
		const currentPageName = this.props.match.params.page
		return (

			<div>
				<TitleLine title={pageNames[currentPageName]} />
				<div className="Box AccordionBoxContainer ">
				<hr className="Accordion-box-line" />
				{renderedContent}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { forms: state.content.formLists,
  				 language: state.content.language  }
}

export default connect(mapStateToProps, { fetchForms })(FormsPageSelected)
