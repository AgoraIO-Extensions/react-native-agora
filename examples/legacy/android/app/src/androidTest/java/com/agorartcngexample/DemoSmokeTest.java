package com.agorartcngexample;

import android.Manifest;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.SdkSuppress;
import androidx.test.platform.app.InstrumentationRegistry;
import androidx.test.uiautomator.By;
import androidx.test.uiautomator.UiDevice;
import androidx.test.uiautomator.UiObject2;
import androidx.test.uiautomator.Until;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertNotNull;

@RunWith(AndroidJUnit4.class)
@SdkSuppress(minSdkVersion = 28)
public class DemoSmokeTest {
    private static final String APP_ID = "com.agorartcngexample";
    private static final String HOME = "APIExample";
    private static final long TIMEOUT_MS = 60_000;
    private UiDevice device;
    private ActivityScenario<MainActivity> scenario;

    @Before public void launchDemo() {
        android.app.Instrumentation instrumentation = InstrumentationRegistry.getInstrumentation();
        device = UiDevice.getInstance(instrumentation);
        instrumentation.getUiAutomation().grantRuntimePermission(APP_ID, Manifest.permission.CAMERA);
        instrumentation.getUiAutomation().grantRuntimePermission(APP_ID, Manifest.permission.RECORD_AUDIO);
        scenario = ActivityScenario.launch(MainActivity.class);
        text(HOME);
    }

    @After public void closeDemo() {
        if (scenario != null) scenario.close();
    }

    @Test public void homeIsVisible() { text(HOME); }
    @Test public void audioPageOpens() { openPage("JoinChannelAudio"); }
    @Test public void videoPageOpens() { openPage("JoinChannelVideo"); }

    private void openPage(String name) {
        text(name).click();
        text("join Channel");
        text(name);
    }

    private UiObject2 text(String value) {
        UiObject2 result = device.wait(Until.findObject(By.pkg(APP_ID).text(value)), TIMEOUT_MS);
        assertNotNull("Missing visible app text: " + value, result);
        return result;
    }
}
