import React, {Component} from 'react'

import Carrusel from "./live-pictures"
import PictureUploader from "./live-upload"

class LivePage extends Component {
    constructor (){
        super ()
        this.state = {}
    }

    render () {
        return (
            <>
                <PictureUploader />
            </>
        )
    }
}

export default LivePage