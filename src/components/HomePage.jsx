import ApiService from "../../service/ApiService";
import { useEffect, useState } from "react";
function HomePage() {
    const monService = new ApiService("http://localhost:8080/catalogues");
    const [catalogues, setCatalogues] = useState([]);
    const [catalogueToChild, setCatalogueToChild] = useState([0,0]);
    

    useEffect(() => {
        monService.get()
            .then((response) => {
                setCatalogues(response.content)
                console.log(response.content);
                setCatalogueToChild(response.content[0]);
            })
            .catch((error) => {
                // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
                alert(error.message)
            })
            // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
            // il s'exécutera
            .finally(() => console.log('Get terminé'))
    }, []);
    



    return (
        <>
            <h1>Bienvenue Page Accueil</h1>
            <div class="list-group mt-6">
            {catalogues.map((catalogue) => (
                <button class="list-group-item list-group-item-action" key={catalogue.id} on onClick={() => setCatalogueToChild(catalogue)}    >{catalogue.name}</button>

            )
            )}
            </div>
            <Catalogue catalogueChild={catalogueToChild} /> 



        </>
    )
}


function Catalogue({ catalogueChild }) {
    
    
    const [instrumentales, setInstrumentales] = useState([]);
    useEffect( ()=>{
        setInstrumentales(catalogueChild.instrumentales)
    }, [catalogueChild])

    console.log(instrumentales);
    


    return (
        <>

        <table className="table table-zebra border">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Cover</th>
                            <th>Instrumentale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instrumentales? instrumentales.map((instru) => (
                            <tr key={instru.id}>
                                <td>{instru.name}</td>   
                                <td>
                                    <img key={instru.id} src={`src/assets/RessourceProjet/cover/${instru.cover}`} />
                                </td>
                                <td>
                                    <audio key={instru.id} controls src={`src/assets/RessourceProjet/instrumentale/${instru.file}`}></audio>    
                                </td>
                            </tr>
                        )                        
                        ):""}
                    </tbody>
                </table>
        
        {/* {instrumentales.map((instru) => (         
         <div className="col">
         <p key={instru.id}>{instru.name}</p>
         <img key={instru.id} src={`src/assets/RessourceProjet/cover/${instru.cover}`} />
         <audio key={instru.id} controls src={`src/assets/RessourceProjet/instrumentale/${instru.file}`}></audio>       
         </div>
         
        )
                 
         
         
        )} */}
            
                
            
        </>
    )
}






export default HomePage;