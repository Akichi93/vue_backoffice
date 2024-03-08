<template>
    <div class="main-wrapper">
        <Header />

        <Sidebar />
        <div class="page-wrapper">
            <div class="content container-fluid pb-0">

                <div class="row">
                    <div class="col-md-12">
                        <div class="page-head-box">
                            <h3>Module RH</h3>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/home">Tableau de bord</router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">Module RH</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                        <div class="card flex-fill tickets-card">
                            <div class="card-header">
                                <div class="text-center w-100 p-3">
                                    <h2>
                                        <router-link to="/listuser">Utilisateurs</router-link>
                                    </h2>
                                    <h2 class="bl-text mb-1">Ce module permet d'ajouter les utilisateurs de l'application
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                        <div class="card flex-fill tickets-card">
                            <div class="card-header">
                                <div class="text-center w-100 p-3">
                                    <h2><router-link to="/listsalaire">Salaires</router-link></h2>
                                    <h2 class="bl-text mb-1">Ce module permet de lister les entreprises</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                        <div class="card flex-fill tickets-card">
                            <div class="card-header">
                                <div class="text-center w-100 p-3">
                                    <h2><a href="/depenses">Dépenses</a></h2>
                                    <h2 class="bl-text mb-1">Ce module permet d'ajouter les depenses de l'entreprise</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="row">
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                        <div class="card flex-fill tickets-card">
                            <div class="card-header">
                                <div class="text-center w-100 p-3">
                                    <h2><a href="/categories">Catégories dépenses</a></h2>
                                    <h2 class="bl-text mb-1">Ce module permet d'ajouter les catégories de dépense</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                        <div class="card flex-fill tickets-card">
                            <div class="card-header">
                                <div class="text-center w-100 p-3">
                                    <h2><a href="/categoriestypes">Catégories types</a></h2>
                                    <h2 class="bl-text mb-1">Ce module permet d'ajouter les types de catégorie</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                        <div class="card flex-fill tickets-card">
                            <div class="card-header">
                                <div class="text-center w-100 p-3">
                                    <h2><a href="/typedepenses">Types de depenses</a></h2>
                                    <h2 class="bl-text mb-1">Ce module permet d'ajouter les types de dépenses</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>






            </div>
        </div>
    </div>
</template>
<script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
export default{
    components: {
    Header,
    Sidebar,
  },
}
</script>