// import { useEffect } from "react";
// import { useRouter } from "next/router";

// const useInterceptBackNavigation = (
//   onBackAttempt: () => boolean | void,
//   isOpen: boolean
// ) => {
//   const router = useRouter();

//   useEffect(() => {
//     if (isOpen) {
//       return;
//     }
//     const handlePopState = (event: PopStateEvent) => {
//       if (isOpen) {
//         return;
//       }
//       // Llamamos a la función callback proporcionada
//       const shouldPreventNavigation = onBackAttempt();

//       if (shouldPreventNavigation) {
//         // Si la función callback devuelve `true`, evitamos la navegación hacia atrás
//         // Empujamos el estado actual al historial de nuevo para "anular" el retroceso
//         window.history.pushState(null, "", window.location.href);
//       }
//     };

//     // Escuchamos el evento `popstate`
//     window.addEventListener("popstate", handlePopState);

//     // Empujamos el estado actual para poder anular la navegación hacia atrás la primera vez
//     window.history.pushState(null, "", window.location.href);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [router]);
// };

// export default useInterceptBackNavigation;
