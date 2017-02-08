import React from 'react';

import style from './style';

export default class Popup extends React.Component {
    constructor(props){
        super(props);
    }
    handlePopupBeingClicked (e) {
        console.log('handlePopupBeingClicked:', this.props);
    }
    render(){
        const activeStyle = {
            display: 'block'
        }

        if (this.props.isActive) {
            return (
                <div
                    className={`popup ${style['module-style']}`}
                    onClick={this.handlePopupBeingClicked.bind(this)}>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
