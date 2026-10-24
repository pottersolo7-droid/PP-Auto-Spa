const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        navigation.classList.toggle("is-open", !isExpanded);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 760px)").matches) {
            menuToggle.setAttribute("aria-expanded", "false");
            navigation.classList.remove("is-open");
        }
    });
}

const bookingDate = document.querySelector("#booking-date");
if (bookingDate instanceof HTMLInputElement) {
    const now = new Date();
    const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    bookingDate.min = localToday.toISOString().slice(0, 10);
}

const bookingService = document.querySelector("#booking-service");
if (bookingService instanceof HTMLSelectElement) {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (requestedService && Array.from(bookingService.options).some((option) => option.value === requestedService || option.text === requestedService)) {
        bookingService.value = requestedService;
    }
}

document.querySelectorAll(".whatsapp-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!(form instanceof HTMLFormElement) || !form.reportValidity()) {
            return;
        }

        const formData = new FormData(form);
        const formKind = form.getAttribute("data-form-kind");
        const lines = formKind === "booking"
            ? [
                "Hi PP Auto Spa, I’d like to request a booking.",
                `Name: ${formData.get("name")}`,
                `Phone: ${formData.get("phone")}`,
                `Vehicle: ${formData.get("vehicle") || "Not provided"}`,
                `Service: ${formData.get("service")}`,
                `Preferred date: ${formData.get("date") || "Flexible"}`,
                `Additional details: ${formData.get("message") || "None"}`
            ]
            : [
                "Hi PP Auto Spa, I have a question.",
                `Name: ${formData.get("name")}`,
                `Phone: ${formData.get("phone") || "Not provided"}`,
                `Message: ${formData.get("message")}`
            ];
        const whatsappUrl = `https://wa.me/27603749813?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
});
