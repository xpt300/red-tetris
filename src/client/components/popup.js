import React from 'react'

const popup = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: "100%",
    width: "100%",
    backgroundColor: 'black'
}

const title = {
    color: 'white',
    fontFamily: "Open sans",
    textAlign: 'center',
    fontSize: '3em'
}

const userInput = {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    borderBottom: "2px solid #fff",
    outline: "none",
    fontFamily: "Open sans",
    fontSize: '2em',
    paddingBottom: "15px",
    textAlign: "center",
    width: "400px"
}

const block = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
}



const Popup = ({handleLogin, closePopup}) => (
    <div style={popup}>
        <li>
            <div style={block}>
                <h3 style={title}>What's your login?</h3>
                <input 
                    style={userInput}
                    onChange={(e) => handleLogin(e.target.value)} 
                    type="text"
                    onKeyPress={(e) => closePopup(e.key)} 
                    />
            </div>
        </li>
    </div>
)

export default Popup