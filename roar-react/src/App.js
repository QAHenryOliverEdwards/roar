import {UserPost} from "./main page components/UserPost";
import {Topbar} from "./main page components/Topbar";
import {Middlebar} from "./main page components/Middlebar";

function App() {
    return (
        <div>
            <Topbar logo={'https://lh3.googleusercontent.com/-d3gQ-A4LF-gfpjBI2YSrwYGZDzW5OEOE4MAUCmIn48UAc8H0PPVC1v6Jt1CvBU9OMbxaEnl_NJn-hI4neAp6dfD2tARXaOSfXIbyPMNrXbTPwG0XP5Z-8H2uBHZ8rx4bVieOkT3gGTUtQtWavPGlsau_thTcDHMvEdMzy9kQpAO4He_Vb7b-JuxubeRyRMxwiO-Jx0YhM_Kbf6a6d48SJtNebDn4pNu74Fg1SukwXwt52A4HjTSPCm1p0LSgbglw6sCw3EG9pA8iUv_UeYT2QiSeNQN1uzx1crezNK4lCAmVfCLcVcV38nCdn3cyTjz9ne4dA5QSwzYCbSrF9DHCKBq9uzIrYFB5oj8Zf4T-0Z3fdauTE9tFpVzDmo4U5a9R4tcGToAOKlAzvjMMl7YeEuTXkX72fRJeugbMuAvSADQNFD9LVU13T4ubrFUGWzgT6bU9UFdCOZmrbqZw2aZXK2OpQPv1V1TSB9mzxRu9PTBvJW-RWacp38iLmZvKnIR3UroQO0hG6sDa2ei_UuC8swMh05jisulu8Am-aU_j7C1YX8x70yY9nbAlZhX6uKbTC8iVIoUJZX31Wy1N_xmH_BjcET89HHCpYdoYR2pgtOackp6cvqk9MJTGaeCKWvd9aE5BoSUKkHAvx1ACJwDOi-gXEe4l_AyyZFaR-zLS78g-TE3dVaBvzoSzVHSJ8V1CfXCcbw4V8WwR87aoIMq073W=s100-no?authuser=0'}/>
            <Middlebar/>
            <UserPost
                img={'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg'}
                username={'The Tree Channel'}
                postText={'Here are some nice trees for you'}/>
        </div>
    );
}

export default App;
