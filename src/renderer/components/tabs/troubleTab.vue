<template>
  <div class="right">
      <header>
      <h3>Troubleshooting</h3>
    </header>
    
    <div class="cont">
        <p>Vous trouverez ici des informations
             nécessaires sur les problèmes que vous pouvez
              potentiellement rencontrer
        </p>

        <h4>Erreurs sur les fichiers</h4>
        <p>Les fichiers ayant rencontré des erreurs sont visibles dans <strong>l'historique </strong>. 
        <br>
        Quelque soit le status du fichier, vous le verrai dans cet onglet et un code d'erreur vous permettera de comprendre l'origine du problème.
        <br>
        Afin d'alléger l'historique, vous retrouverai ci-dessous, la signification du code associé au problème.
        </p>

        <table class="errTable">
            <tr>
                <th>Code</th>
                <th>Signification</th>
            </tr>

            <tr>
                <td>6</td>
                <td>Erreur durant l'upload du fichier sur le serveur</td>
            </tr>

            <tr>
                <td>10</td>
                <td>Erreur durant l'annulation de l'upload du fichier</td>
            </tr>

            <tr>
                <td>8</td>
                <td>Erreur durant le chargement du fichier dans la zone de drop</td>
            </tr>
        </table>

        <p>Le <strong>code 6</strong> est le plus fréquent.<br>
        Il est souvent causé par un <strong> problème de connexion </strong> soit côté serveur, soit côté client.<br>
        Vérifiez donc vos paramètres internet puis réessayez l'upload. <br> <br>
        Afin de retenter l'upload, rendez-vous dans l'onglet <strong>Historique des transferts</strong> et cliquez sur le fichier voulu.</p>
        

        </div>

    </div>

  </div>
</template>

<script>
export default {
    name: 'troubleTab',

}
</script>

<style scoped>  

    .right {
        color: #fff ;
        padding-bottom: 30px;
    }

    h4 {
        margin-bottom: 20px;
    }

  

    p {
        font-size: 17px;
        font-weight: 200;
    }

    .cont {
        padding: 0 30px
    }

    th {
        font-weight: 400;
    }

    header {
      padding-left: 30px;
    }

    .errTable {
        margin: 20px 0;
        border-collapse: collapse;
    }

    th, td {
        border-bottom: 1px solid #656563;
    }

    td:last-child {
        font-weight: 200;
    }

    td:first-child {
        text-align: center;
        color: #ff0033
    }

    th, td {
        padding: 10px;
    }


</style>