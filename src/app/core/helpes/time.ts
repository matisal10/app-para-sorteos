export function howLongFromPastDate(futureDate: Date | string, short = false): string {
    let date: Date;
    if (typeof futureDate === "string") {
        date = new Date(futureDate)
    } else {
        date = futureDate
    }
    const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
    let intervalo = seconds / 31536000;
    if (intervalo > 1) {
        if (intervalo < 2) return !short ? "Dentro de un año" : "1 y";
        return "Dentro de " + Math.floor(intervalo) + (!short ? " años" : " y");
    }

    intervalo = seconds / 2592000;
    if (intervalo > 1) {
        if (intervalo < 2) return !short ? "Dentro de un año" : "1 m";
        return "Dentro de " + Math.floor(intervalo) + (!short ? " meses" : " m");
    }

    intervalo = seconds / 86400;
    if (intervalo > 1) {
        if (intervalo < 2) return !short ? "Mañana" : "1 d";
        return "Dentro de " + Math.floor(intervalo) + (!short ? " días" : " d");
    }

    intervalo = seconds / 3600;
    if (intervalo > 1) {
        if (intervalo < 2) return !short ? "Dentro de una hora" : "1 h";
        return "Dentro de " + Math.floor(intervalo) + (!short ? " horas" : " h");
    }

    intervalo = seconds / 60;
    /*if (intervalo > 1) {
      if (intervalo < 2) return !short ? "Dentro de 1 minuto" : "1 m";
      return "Dentro de " + Math.floor(intervalo) + (!short ? " minutos" : " mm");
    }*/

    return (!short ? "Pasado" : "Pasado");
}