import { format } from 'date-fns'
import { pl} from 'date-fns/locale'

const locales = { pl}

export default function (date, formatStr = 'PP') {
    return format(date, formatStr, {
      locale: locales[window.__localeId__] // or global.__localeId__
    })
  }

  export    {locales};