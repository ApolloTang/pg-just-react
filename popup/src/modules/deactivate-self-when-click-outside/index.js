import React, {Component} from 'react';


class DeactivateSelfWhenClickOutside extends Component {
    // A wrapper component that deactive self when click event is
    // not originate from self.
    //
    //      Will be actived when it is clicked
    //      Will be deactive self when the click is not itself.
    //      Does not required an unique id
    //

    constructor(props) {
        super(props);
        this.state={
            isActive: false
        }
        this._selfBeingClicked = false;
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), false );
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), false );
    }

    componentDidUpdate(prevProps, prevState) {
        // Reset registered before next click
        this._selfBeingClicked = false;
    }

    handleClickOutside(e) {
        // This handler always trigger after handleSelfBeingClicked
        if ( this._selfBeingClicked ) {
            this.setState({isActive: true});
        } else {
            this.setState({isActive: false});
        }
    }

    handleSelfBeingClicked(e) {
        // handleSelfBeingClicked() always triggered before handleClickOutside.
        //
        // All this handle does is to set a flag to note that this
        // component has been clicked. It does not decide any
        // redering should be done. Redering or not, the decision is done
        // in handleClickOutside.
        this._selfBeingClicked = true;
    }

    render() {
        // const activeStyle =  {color: (this.state.isActive === true) ? 'red' : 'black'};
        const className = `deactivate-self-when-click-outside ${(this.state.isActive) ? 'isActive' :''}`;

        // Merge the property 'this.state.isActive' into properties of this.props.children
            const clonedChildren = [];
            const hasMoreThenOneChildren  = (Object.prototype.toString.call(this.props.children) === '[object Array]');
            const hasOnlyOneChild  = (Object.prototype.toString.call(this.props.children) === '[object Object]');

            if (hasMoreThenOneChildren) {
                this.props.children.forEach(child=>{
                    const clone = React.cloneElement(child, {isActive: this.state.isActive})
                    clonedChildren.push(clone)
                });
            }
            if (hasOnlyOneChild) {
                const clone = React.cloneElement(this.props.children, {isActive: this.state.isActive})
                clonedChildren.push(clone)
            }


        return (
            <div
                className={className}
                onClick={ (e)=>{this.handleSelfBeingClicked.call(this, e)} }>
                {
                    clonedChildren.map((clonedChild, i)=>{
                        return <div key={i}> {clonedChild} </div>
                    })
                }
            </div>
        );
    }
}

const Demo = () => (
    <div className={`deactivate-self-when-click-outside demo ${style['module-style']}`} >
        { [1,2,3,1,2,3].map((v, i)=>(
            <DeactivateSelfWhenClickOutside
                key={i} >{v}
            </DeactivateSelfWhenClickOutside>)) }
    </div>
);

export default DeactivateSelfWhenClickOutside;
export {Demo};


