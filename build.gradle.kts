plugins {
    id("org.openapi.generator") version "6.6.0"
}

val serviceDir = "$projectDir/service"
val uiDir = "$projectDir/ui"
val apiDir = file("$projectDir/api")
val apiFile = file("$apiDir/assistant-api.yaml")
val serviceImageName = "exam-preparation-assistant-service:latest"
val uiImageName = "exam-preparation-assistant-ui:latest"

// configure generator
openApiGenerate {
    generatorName.set("typescript-axios")
    inputSpec.set("$apiFile")
    outputDir.set("$uiDir/src/api-client")
    configOptions.set( mapOf( "supportsES6" to "true" ) )
}

/*
 * Dieser Task benutzt die API Beschreibung, um eine API für unser Backend zu erzeugen
 */
tasks.register("generateServiceApi") {
    group = "assistant"

    inputs.file(apiFile)
    inputs.dir("$apiDir/templates")
    outputs.file("$serviceDir/code/main.py")
    outputs.file("$serviceDir/code/controller_models.py")

    doLast{
        exec{
            commandLine(("fastapi-codegen --input assistant-api.yaml --template-dir templates " +
                    "--output $serviceDir/code --model-file controller_models.py").split(" "))
            workingDir = apiDir
        }
    }
}

/*
 * Dieser Task generiert einen API-Client für unser Frontend, der mit dem Backend kommunizieren kann.
 */
tasks.register("generateUiApi") {
    group = "assistant"
    dependsOn("openApiGenerate")
}

/*
 * Generiert das Docker-Image für unser Backend.
 */
tasks.register("buildServiceImage") {
    group = "assistant"
    dependsOn("generateServiceApi")

    doLast{
        exec {
            commandLine("docker build --tag $serviceImageName .".split(" "))
            workingDir(serviceDir)
        }
    }
}

/*
 * Generiert das Docker-Image für unser Frontend.
 */
tasks.register("buildUiImage") {
    group = "assistant"
    dependsOn("generateUiApi")

    doLast{
        exec {
            commandLine("docker build --tag $uiImageName .".split(" "))
            workingDir(uiDir)
        }
    }
}

tasks.register("start") {
    group = "assistant"
    dependsOn("buildUiImage")
    dependsOn("buildServiceImage")

    doLast{
        exec {
            commandLine("docker-compose up".split(" "))
            workingDir(projectDir)
        }
    }
}
