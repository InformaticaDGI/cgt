interface Config {
  apiUrl: string,
}

const localConfig: Config = {
  apiUrl: 'http://localhost:3000',
}

const prodConfig: Config = {
  apiUrl: "https://api-cgt.guarico.gob.ve"
}

export const config = import.meta.env.VITE_ENV === 'local' ? localConfig : prodConfig