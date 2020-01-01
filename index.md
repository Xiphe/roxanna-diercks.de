---
layout: default
title: Home
order: 1
inverted: true
permalink: /
cta: true
banners:
  - size: full
    level: 1
    content: Ich $1 Ihre Geschichte<br /> auf $2
    list:
      - kreiere
      - erzähle
      - schreibe
      - definiere
      - teile
    list2:
      - Social Media
      - Events
      - Messen
      - Road-Shows
      - Ihrem Blog
      - Webinaren
      - Ihrer Webseite
    image: assets/roxanna_diercks.jpg
  # - size: half
  #   level: 2
  #   content: Zum Beispiel auf $
  #   list:
  #     - Social Media
  #     - Events
  #     - Festivals
  #     - Messen
  #     - Incentives
  #     - Road-Shows
  #     - Ihrem Blog
  #     - Newslettern
  #     - Webinaren
  #     - Ihrer Webseite
  #   choose: true
  #   image: assets/sky_is_the_limit.jpg
  # - size: full
  #   level: 3
  #   content: Ich bin talentiert in $
  #   rotate: true
  #   list:
  #     - Texterstellung
  #     - Organisation
  #     - Vermarktung
  #     - Konzeption
  #     - Strategie
  #     - Umsetzung
  #     - Brand Building
  #   image: assets/roxanna_diercks_ocean.png
---

{%- capture veranstaltungsmanagement -%}

{%- include icons/troete.svg  -%}

### Veranstaltungsmanagement

Zu jedem Zeitpunkt kann man mich mit in die Organisation reinholen, zur Konzeption, kurz vor der Durchführung der Veranstaltung, in der Evaluierungsphase oder wann immer es brennt.

{% endcapture %}
{%- capture vermarktung -%}

{%- include icons/sprechblasen.svg  -%}

### Vermarktung

Der richtige Ton macht die Musik. Egal ob digital oder klassische Vermarktung ich bediene verschiedenste Kanäle um ihr Produkt/ ihre Dienstleistung optimal zu bewerben.

{% endcapture %}
{%- include cols.html left=veranstaltungsmanagement right=vermarktung -%}

{%- capture marketingkonzeption -%}

{%- include icons/rakete.svg  -%}

### Marketingkonzeption

Ich helfe Ihnen gerne bei der **Konzeption** neuer Kampagnen, strategischen **Weiterentwicklung** bestehender Formate sowie Identifikation von Werten und Motiven zum Aufbau einer Marke.

{% endcapture %}
{%- capture projektmanagement -%}

{%- include icons/zahnraeder.svg  -%}

### Projektmanagement

Ich stehe Ihnen während jeder Phase Ihres Projektes mit professioneller Kompetenz, einem bestehenden Netzwerk an externen Dienstleistern und langjähriger Erfahrung im Bereich des agilen Projektmanagement wie in der Steuerung externer Agenturen zur Seite.

{% endcapture %}
{%- include cols.html left=marketingkonzeption right=projektmanagement -%}
