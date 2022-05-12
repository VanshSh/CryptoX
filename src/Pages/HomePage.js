import { LinearProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../Components/ErrorBoundary'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer'
const CoinsTable = React.lazy(() => import('../Components/CoinsTable'))

const HomePage = () => {
    return (
        <>
            <Banner />
            <ErrorBoundary
                FallbackComponent={<ErrorFallback />}
                onReset={() => {
                    window.location.reload()
                }}
            >
                <Suspense fallback={<LinearProgress color='success' />}>
                    <CoinsTable />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default HomePage
