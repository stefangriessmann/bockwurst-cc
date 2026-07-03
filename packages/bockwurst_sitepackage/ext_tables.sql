#
# Zusatzfeld an tt_content: Strava-Activity-ID für die Tour-CEs.
#
CREATE TABLE tt_content (
	tx_bockwurst_strava_id varchar(32) DEFAULT '' NOT NULL
);

#
# Strava-Activity-ID auch als Seiteneigenschaft der Tour-Detailseite (Hero/JSON-LD).
#
CREATE TABLE pages (
	tx_bockwurst_strava_id varchar(32) DEFAULT '' NOT NULL
);
