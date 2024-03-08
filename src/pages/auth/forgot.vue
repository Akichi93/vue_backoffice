<template>
    <div class="account-page">
        <div class="main-wrapper">
            <div class="account-content">
                <div class="container">

                    <div class="account-logo">
                        <a href="a"><img src="" alt="Courtage"></a>
                    </div>

                    <div class="account-box">
                        <div class="account-wrapper">
                            <h3 class="account-title">Mot de passe oublié?</h3>
                            <p class="account-subtitle">Saisissez votre courriel pour obtenir un mot de passe de réinitialisation</p>

                            <form>
                                <div class="input-block mb-4">
                                    <label class="col-form-label">Email</label>
                                    <input class="form-control" type="text">
                                </div>
                                <div class="input-block mb-4 text-center">
                                    <button class="btn btn-primary account-btn" type="submit">Réinitialisation</button>
                                </div>
                                <div class="account-footer">
                                    <p>Je me souviens de mon mot de passe? <router-link to="/">Se connecter</router-link></p>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>