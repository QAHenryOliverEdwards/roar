const About = () => {
    return (
        <div id={'about-page'}>
            <h1 className={'title text-center'}>About Roar</h1>
            <p className={'about-text mx-3'}>Roar is a small project developed by <a
                href={'https://github.com/QAHenryOliverEdwards'} id={'link-henry-github'}>Henry Oliver-Edwards</a> ,
                <a href={'https://github.com/CGuthrieQA'} id={'link-cameron-github'}>Cameron Guthrie</a> and <a
                    href={'https://github.com/giefortunaQA'} id={'link-gie_ann-github'}>Gie-Anne Fortuna </a>. It aims to
                be an online means of communication, which takes inspiration from other social media platforms such as
                twitter and Facebook. It aims to be similar
                to these platforms while providing it's own unique twist, as well as letting us practice the skills we
                have learnt and let us pick-up new skills along the way.
                <br/>
                <br/>
                There are 3 major groups of technologies used in this project, the back-end (the part of application
                which you do not see, it handles web requests,
                managing of the database and processing) it written in Java, using the Spring Boot framework. The
                front-end (the part of the application you interact
                with is written in JavaScript using the React framework. And finally we used AWS to deploy the
                application. Since this is an opensource project, all of
                the source code can be found on out <a href={'https://github.com/QAHenryOliverEdwards/roar'} id={'link-roar-github'}>Github
                    repository</a>.</p>
        </div>
    )
}

export default About;