<template>
  <div class="app-loading">
    <div class="loader">
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  </div>
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
export default {
  name: 'AppLoading',
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate2 {
  0% {
    transform: rotate(0deg);
    border-top-color: $color-blue;
  }

  50% {
    transform: rotate(180deg);
    border-top-color: $color-green;
  }

  100% {
    transform: rotate(360deg);
    border-top-color: $color-blue;
  }
}

@mixin loading-div-mixin {
  border-radius: 50%;
  padding: 8px;
  border: 2px solid transparent;
  animation: rotate linear 3.5s infinite;
}

.app-loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: fade-out($color-white, 0.25);
}

.loader {
  position: sticky;
  top: calc(50% - 75px);
  left: calc(50% - 75px);
  width: 150px;
  height: 150px;
  overflow: hidden;

  &,
  div {
    @include loading-div-mixin;
    border-radius: 50%;
    padding: 4px;
    animation: rotate2 4s infinite linear;
    will-change: transform;
  }

  div {
    height: 100%;
  }
}
</style>
