import style from './mentionsLegales.module.css';

const MentionsLegales = () => {

    return (
        <section id={style.mentionsLegales}>
            <h1>
                MENTIONS LÉGALES
            </h1>
            <div class={style.mentionsSection}>
                <h2 class={style.mentionTitre}>
                    ÉDITION
                </h2>
                <div>
                    <p>
                        Le site internet www.viisync.com est édité par l'entrepreneur individuel BELASLOUNI Yanis
                    </p>
                    <p>
                        Numéro de SIRET : 88965160000021
                    </p>
                    <p>
                        Siège social : 481 CHE DES PLATEAUX FLEURIS 06700 SAINT-LAURENT-DU-VAR
                    </p>
                    <p>
                        Numéro de TVA intracommunautaire: FR06889651600
                    </p>
                    <p>
                        Code APE : Activités spécialisées de design (7410Z)
                    </p>
                </div>
            </div>
            <div class={style.mentionsSection}>
                <h2 class={style.mentionTitre}>
                    PUBLICATION
                </h2>
                <div>
                    <p>
                        Directeur de la publication : THAON Julien
                    </p>
                    <p>
                        Réalisation technique et graphique : BELASLOUNI Yanis
                    </p>
                    <p>
                        Rédaction : BELASLOUNI Yanis
                    </p>
                    <p>
                        Téléphone : 0623500116
                    </p>
                    <p>
                        Mail: thaonjulien@gmail.com
                    </p>
                </div>
            </div>
            <div class={style.mentionsSection}>
                <h2 class={style.mentionTitre}>
                    HÉBERGEMENT
                </h2>
                <div>
                    <p>
                        Hébergeur : Vercel
                    </p>
                    <p>
                        Vercel Inc.
                    </p>
                    <p>
                        440 N Barranca Ave #4133
                    </p>
                    <p>
                        Covina, CA 91723
                    </p>
                    <p>
                        Site internet : https://www.vercel.com
                    </p>
                </div>
            </div>
            <div class={style.mentionsSection}>
                <h2 class={style.mentionTitre}>
                    CRÉDITS
                </h2>
                <div>
                    <p>
                        Crédit photo : Envato
                    </p>
                </div>
            </div>
        </section>
    )
}

export default MentionsLegales;