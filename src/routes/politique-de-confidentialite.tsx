import style from './mentionsLegales.module.css';

const PrivacyPolicy = () => {

    return (
        <section id={style.mentionsLegales}>
            <h1>
                POLITIQUE DE CONFIDENTIALITÉ
            </h1>
            <div class={style.mentionSections}>
                <h2 class={style.mentionTitre}>
                    1. DONNÉES PERSONELLES
                </h2>
                <div class={style.mentionsSection}>
                    <h2 class={style.mentionTitre}>
                        1.1. - Quelles sont les données collectées ?
                    </h2>
                    <div>
                        <p>
                            Les données collectées sur le site viisync.com sont des données de contact : mail, nom et prénom.
                        </p>
                    </div>
                </div>
                <div class={style.mentionsSection}>
                    <h2 class={style.mentionTitre}>
                        1.2. Comment ces données sont-elles collectées ?
                    </h2>
                    <p>
                        Ces données sont collectées par le biais d'un formulaire web.
                    </p>
                </div>
                <div class={style.mentionsSection}>
                    <h2 class={style.mentionTitre}>
                        1.3. Type de traitements
                    </h2>
                    <p>
                        Un mail récapitulatif de vos données et de votre demande sera communiqué à notre adresse mail.
                    </p>
                </div>
                <div class={style.mentionsSection}>
                    <h2 class={style.mentionTitre}>
                        1.4. Finalité des traitements
                    </h2>
                    <p>
                        Les données collectées ont pour finalité de débuter et de maintenir un potentiel contact client.
                    </p>
                </div>
                <div class={style.mentionsSection}>
                    <h2 class={style.mentionTitre}>
                        1.5. Combien de temps seront elles conservées ?
                    </h2>
                    <p>
                        Ces données seront conservées pour une durée de 3 an à compter de l'envoi de la demande.
                    </p>
                </div>
                <div class={style.mentionsSection}>
                    <h2 class={style.mentionTitre}>
                        1.6. À qui seront elles transmises ?
                    </h2>
                    <p>
                        Les données sont uniquement transmises à BELASLOUNI Yanis.
                        Par conséquent il n'y a aucune transmission des données à des prestataires tiers ou hors U.E. .
                    </p>
                </div>
                <div class={style.mentionsSection}>
                    <h2 class={style.mentionTitre}>
                        1.7. Droit sur les données personelles
                    </h2>
                    <p>
                        Conformément à la loi, l'utilisateur a un droit de suppression et d'accès à ses données personelles. Pour faire exercer ce droit, un mail doit être expédié à l'adresse belaslouni.yanis@gmail.com avec pour objet "Demande d'exercice de droit sur les données personelles".
                        L'adresse mail est la même pour toute autre demande concernant notre politique de confidentialité.
                    </p>
                </div>
                <div class={style.mentionsSection}>
                    <h2 class={style.mentionTitre}>
                        1.8. Mesure de sécurité concernant les données personelles
                    </h2>
                    <p>
                        Des mesures de sécurité strictes sont mises en place dans notre système de transmission de l'information, tel que le cryptage SSL par exemple. Par ailleurs notre hébergeur américain Vercel est certifié et à la pointe de la technologie en terme de cyber sécurité.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicy;