# Owner handoff checklist — Khao Moo website

Everything the site shows came from the owner-supplied photos and menu card, the Instagram handle and the Google Maps link in the brief. Below is what's **verified and live**, what's **hidden until you supply it**, and what to **double-check**.

## ✅ Verified and live
| Item | Source |
| --- | --- |
| Name and tagline: *Khao Moo — The Ethnic Food Hub* | Logo / packaging |
| Established 2023 | Logo seal ("Estd. 2023") |
| Phone / WhatsApp: +91 60014 98277 | Menu card ("Call us/WhatsApp us") and product label |
| Pickle prices (Chicken, Pork, Smoked Pork at 50 g / 100 g / 250 g) | Menu card |
| Veg pickles: Bhoot Jolokiya and Khorisa Bhoot Jolokiya, ₹150 per 100 g | Menu card |
| Chilli-Garlic Oil 200 ml, ₹299, with its description and highlights | Menu card / poster |
| How to order, pan-India shipping for pickles, pre-paid only / no COD | Menu card |
| North-East delivery charges (₹80 / ₹120 / ₹160 / ₹220) | Menu card |
| "Ethnic Pickles, Made just for you" · "Fresh · Authentic · Homemade" | Product label |
| Instagram @khao.moo | Brief |
| Google Maps listing (link and directions) | Brief |

## ⚠️ Please confirm
- [ ] **Address**: "Cherekapar, Sivasagar – 785701, Assam" comes from the *Manufactured & Marketed by* line on the pickle label. Confirm it's the right address for visitors and matches the Google Maps pin.
- [ ] **Smoked Pork with Bamboo Shoot**: shown under "From the Kitchen" with **no price** ("Ask on WhatsApp"). Supply a price, or confirm whether it's a regular item.
- [ ] **Logo**: the header and footer use an **SVG redraw** of the seal. Send the original vector logo (SVG/AI/PDF) and set `site.logo` in `src/config/site.js`.
- [ ] **Our Story** text: written only from facts on your packaging. Replace it with your own words if you'd like (history, family recipes, ingredients). Then set `story.ownerApproved: true`.
- [ ] **Menu descriptions**: pickles currently say "Fresh, authentic and homemade." Send a line per item if you'd like something more specific.
- [ ] **Dietary labels**: only *Veg* (two veg pickles, as on the menu card) and *Non-veg* (chicken/pork items) are shown. Confirm whether Chilli-Garlic Oil should carry a Veg label.

- [ ] **Map in Visit Us**: it searches Google Maps for "Khao Moo The Ethnic Food Hub, Sivasagar, Assam". Check that it lands on the right pin. For an exact pin, open your listing → Share → Embed a map, and paste the `src` value into `site.maps.embedUrl`.

## ❌ Missing (hidden on the site until supplied)
- [ ] **Opening hours** (`site.hours` and `site.schemaHours`)
- [ ] **Website domain** for canonical and social links (`site.siteUrl`)
- [ ] **Reservations**: do you accept table reservation requests on WhatsApp? If yes, set `features.reservations.enabled: true` (the form is built and tested).
- [ ] **Reviews**: only real reviews, with author and source (`features.reviews`). Until then the site shows a "Find Us on Google Maps" link.
- [ ] **Menu PDF** (optional): the menu card JPG is offered for download now.
- [ ] **More photos**: dining area/interior, kitchen and more dishes. The gallery currently uses the 7 supplied photos.
- [ ] **Instagram post links**: link each curated tile to its post (`images.instagram[].postUrl`). Tiles currently open the profile. The section is labelled as a hand-picked selection, not a live feed.
- [ ] **Email** and **Facebook** (optional)

## Notes
- No cart, checkout or delivery-time promises were added. Ordering goes through a call or a WhatsApp message, as the menu card says.
- The two poster-style images (menu card and Chilli-Garlic Oil poster) still show the "Launching on 2nd September" text from the original artwork. Swap in a plain product photo if you prefer.
