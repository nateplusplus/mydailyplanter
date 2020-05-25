import React from "react"
import PropTypes from "prop-types"

import Layout from './Layout.js'

import useSiteMetadata from '../hooks/useSiteMetadata'

const PageWrapper = ( {children} ) => {
    const { site, siteLogo } = useSiteMetadata();
    return(
        <div className="site-container">
            <Layout metadata={{ site, siteLogo }}>
                { children }
            </Layout>
        </div>
    )
}

export default PageWrapper;