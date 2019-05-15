import React, { PureComponent } from 'react'
import WolframAPI from '../config';

export class WolframGraph extends PureComponent {
    state = {
        url: null,
        loading: true,
    }

    async componentDidMount() {
        try {
            const url = await WolframAPI.getSimple(this.props.expression);
            this.setState({ url })
        } catch(e) {
            console.error('Something went wrong', e.message);
        }
    }

    handleImageLoaded = () => {
        this.setState({ loading: false })
    }

    render() {
        const { loading, url } = this.state
        return (
            <div>
                {loading && 'Loading...'}
                <img src={url} onLoad={this.handleImageLoaded} />
            </div>
        )
    }
}

export default WolframGraph;

