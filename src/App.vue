<template>
    <div id="app">
        <main>
            <router-view />
        </main>
    </div>
</template>

<style>
    #app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1;
    }
</style>
