#!/bin/bash
casperjs $1 --site=http://www.ergebnisselive.com/eishockey/deutschland/del/ > tableDel.xml
echo "</table></section></article>" >> tableDel.xml
casperjs $1 --site=http://www.ergebnisselive.de/eishockey/finnland/liiga/ > tableLiiga.xml
echo "</table></section></article>" >> tableLiiga.xml
casperjs $1 --site=http://www.ergebnisselive.de/eishockey/osterreich/ebel/ > tableEbel.xml
echo "</table></section></article>" >> tableEbel.xml
casperjs $1 --site=http://www.ergebnisselive.de/eishockey/russland/khl/ > tableKhl.xml
echo "</table></section></article>" >> tableKhl.xml
casperjs $1 --site=http://www.ergebnisselive.de/eishockey/schweden/elitserien/ > tableElitserien.xml
echo "</table></section></article>" >> tableElitserien.xml
casperjs $1 --site=http://www.ergebnisselive.de/eishockey/schweiz/nla/ > tableNla.xml
echo "</table></section></article>" >> tableNla.xml
casperjs $1 --site=http://www.ergebnisselive.de/eishockey/tschechien/extraliga/ > tableExtraliga.xml
echo "</table></section></article>" >> tableExtraliga.xml
casperjs $1 --site=http://www.ergebnisselive.de/eishockey/usa/nhl/ > tableNhl.xml
echo "</table></section></article>" >> tableNhl.xml