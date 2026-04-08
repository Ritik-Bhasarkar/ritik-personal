import Navbar from '@/components/navbar/navbar';
import './page.scss';

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="home">
                <div className="home--content">
                    <h1 className="home--title">Theme Toggle</h1>
                    <p className="home--subtitle">
                        Use the switch in the navbar to toggle between light and dark mode.
                        The theme is persisted to localStorage.
                    </p>
                    <div className="home--cards">
                        <div className="home--card">
                            <h2 className="home--card--title">Background</h2>
                            <p className="home--card--text">
                                Surface uses <code>--color-bg</code> switching between{' '}
                                <code>#ffffff</code> and <code>#0c0e12</code>.
                            </p>
                        </div>
                        <div className="home--card">
                            <h2 className="home--card--title">Secondary Surface</h2>
                            <p className="home--card--text">
                                Cards use <code>--color-bg-secondary</code> switching between{' '}
                                <code>#f9fafb</code> and <code>#161b26</code>.
                            </p>
                        </div>
                        <div className="home--card">
                            <h2 className="home--card--title">Border</h2>
                            <p className="home--card--text">
                                Borders use <code>--color-border</code> switching between{' '}
                                <code>#d0d5dd</code> and <code>#333741</code>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
