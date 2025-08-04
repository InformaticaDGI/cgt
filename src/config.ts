interface Config {
  apiUrl: string,
}

const localConfig: Config = {
  apiUrl: 'http://localhost:3000',
}

const prodConfig: Config = {
  apiUrl: "https://api-cgt.guarico.gob.ve"
}

const developConfig: Config = {
  apiUrl: "https://demo-api-cgt.guarico.gob.ve"
}

const base: Record<string, Config> = {
  "local": localConfig,
  "production": prodConfig,
  "develop": developConfig
}

export const config = base[import.meta.env.VITE_ENV]
