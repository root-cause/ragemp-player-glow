// Functions
async function requestNamedPtfxAssetAsync(ptfxAssetName) {
    mp.game.streaming.requestNamedPtfxAsset(ptfxAssetName);

    while (!mp.game.streaming.hasNamedPtfxAssetLoaded(ptfxAssetName)) {
        await mp.game.waitAsync();
    }

    mp.game.graphics.setPtfxAssetNextCall(ptfxAssetName);
}

async function updatePlayerGlowPtfx(entity, data) {
    if (data) {
        if (entity.__glowPtfxHandle == null) {
            await requestNamedPtfxAssetAsync("scr_bike_adversary");
            entity.__glowPtfxHandle = mp.game.graphics.startParticleFxLoopedOnEntity("scr_adversary_ped_light_good", entity.handle, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, false, false, false);
        }

        mp.game.graphics.setParticleFxLoopedColour(entity.__glowPtfxHandle, data.red, data.green, data.blue, false);
    } else {
        removePlayerGlowPtfx(entity);
    }
}

function removePlayerGlowPtfx(entity) {
    if (entity.__glowPtfxHandle) {
        mp.game.graphics.removeParticleFx(entity.__glowPtfxHandle, false);
        delete entity.__glowPtfxHandle;
    }
}

// Events
mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player") {
        updatePlayerGlowPtfx(entity, entity.getVariable("__glowColor"));
    }
});

mp.events.add("entityStreamOut", (entity) => {
    if (entity.type === "player") {
        removePlayerGlowPtfx(entity);
    }
});

mp.events.addDataHandler("__glowColor", (entity, value) => {
    if (entity.type === "player" && entity.handle !== 0) {
        updatePlayerGlowPtfx(entity, value);
    }
});