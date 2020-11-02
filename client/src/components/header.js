import React from 'react';

/**
 * Component to display header
 * 
 * @return {React.ReactNode} 
 * 
 */
function header () {
    return (
        <header className="header">
        <div className="header__container">
            <h1 className="header__container__title">Code challenge:<span className="header__container__title--strong">Age convertor</span></h1>
        </div>
      </header>
    );
}

export default header;