import React from "react"
import PropTypes from "prop-types"

import Layout from './Layout.js'

import useSiteMetadata from '../hooks/useSiteMetadata'

const PageWrapper = ( {children} ) => {
    const { site, siteLogo } = useSiteMetadata();
    return(
        <Layout metadata={{ site, siteLogo }}>
            { children }
        </Layout>
    )
}

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PageWrapper;