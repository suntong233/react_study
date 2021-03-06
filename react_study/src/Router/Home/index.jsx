import React from 'react';
import HomeMenu from '../../Components/HomeMenu';
import style from './style.module.scss';
import Header from '../../Components/Header';

function Home(props) {
    return (
        <>
        <Header />
        <div className={style.all}>
            <div className={style.container}>
                <div className={style.letf}>
                    <HomeMenu />
                </div>
                <div className={style.right}>
                    { props.children }
                </div>
            </div>
            <div className={style.strenth}></div>
            <div className={style.footerbox}>Footer</div>
        </div>
        </>
    )
}

export default Home
