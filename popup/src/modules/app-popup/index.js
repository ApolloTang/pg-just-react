import React from 'react';
import DeactivateSelfWhenClickOutside from 'modules/deactivate-self-when-click-outside';
import Popup from 'modules/popup';

const Content = ({children}) => (
    <div>{children}</div>
)

const ModuleRoot = () => (
    <div>
        { [1,2,3].map((v, i)=>(
            <DeactivateSelfWhenClickOutside key={i} >
                <Content>{v}</Content>
                <Popup >{`popup content ${v}`}</Popup>
            </DeactivateSelfWhenClickOutside>)) }
    </div>
);

export default ModuleRoot;
