import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((e, i) => {
                        const Page = e.component;
                        let Layout = DefaultLayout;
                        if (e.layout) {
                            Layout = e.layout;
                        } else if (e.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={i}
                                path={e.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
