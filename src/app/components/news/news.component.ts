import { Component, OnInit, AfterViewInit } from "@angular/core";
declare let $: any;
@Component({
    selector: "app-news",
    templateUrl: "./news.component.html",
    styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
    news = [
        {
            date: "28-05-2021",
            content: "The flood of COVID-19 cases in India has affected the supply of the Covax vaccine in India. There will be a shortage of almost 190 million doses by the end of June.",
        },
        {
            date: "28-05-2021",
            content:
                "The cocktail made of two monoclonal antibodies is suggested as an effective way to treat COVID-related complications in patients. Monoclonal antibodies are artificially designed in a laboratory and tailor-made to fight a particular disease.",
        },
        {
            date: "28-05-2021",
            content:
                "As per WHO's report on COVID-19, the B.1.617 COVID-19 variant, which was first detected in India, is now found in 53 countries. India reported a 23 percent drop in the number of new cases in the last seven days, but still tops the world list.",
        },
        {
            date: "28-05-2021",
            content:
                "13 Gurugram villages managed to remain COVID-free with no COVID positive case reported in the last 40 days. Seven Covid-free villages are in Pataudi block, four in Farukhnagar, and two in Sohna. These villages strictly followed guidelines with complete lockdown and sanitization and won the battle against COVID-19.",
        },
        {
            date: "28-05-2021",
            content:
                "There is some good news amid the deaths and positive cases of COVID-19. India is finally experiencing a fall in the second wave of COVID-19 cases and expecting this fall to continue as the restrictions are relaxed.",
        },
        {
            date: "28-05-2021",
            content:
                "The central government has decided to provide financial assistance to families of journalists who lost their lives due to COVID-19. Families of each of these journalists will receive financial help of Rs. 5 lakh each under the Journalist Welfare Scheme (JWS).",
        },
        {
            date: "10-05-2021",
            content:
                "India will face shortage of COVID-19 vaccines till July as said by (Serum Institute of India) SII chief Adar Poonawalla. India's pandemic condition is getting worse as compared to other nations as the nation was not expecting this second wave to be so deadly.",
        },
        {
            date: "10-05-2021",
            content:
                "Varun Chakravarthy and Sandeep Warrier players from the Kolkata Knight Riders team, test positive for COVID-19. This led to the cancellation of the IPL match of Kolkata Knight Riders against Royal Challengers Bangalore in Ahmedabad.",
        },
        {
            date: "10-05-2021",
            content:
                "The Managing Director of glassware company Borosil Ltd and Borosil Renewable Ltd based in Mumbai has said to provide financial assistance to the families of employees who died of COVID-19. Their families will be given two years salary along with their children's education till graduation in India.",
        },
        {
            date: "10-05-2021",
            content:
                "Flights from the US carrying medical supplies for India to help in these tough times are delayed till Wednesday due to some maintenance issues. So, far only two flights have landed in India and we are looking forward to three more flights for medical assistance by Wednesday.",
        },
        {
            date: "10-05-2021",
            content:
                "Delhi administration has announced to shut Chandni Chowk market till April 15 due to rise in COVID cases as India is hard hit by the UK variant. The Delhi Kirana Committee of Khari Baoli Market and the Chemical Merchant Association of Tilak Bazaar also announced the closing of markets till April 21.",
        },
        {
            date: "30-04-2021",
            content:
                "IIT Kanpur and IIT Hyderabad scientists predicted a high spike in Covid-19 cases by mid-May 2021. The second wave of the ongoing pandemic has turned lives and the economy upside down. There are daily reports of a surge in covid positive cases and deaths due to covid. On Friday, India experienced a single-day growth in 3,32,730 (3.32 lakh) COVID-19 infections and 2,263 fatalities with 24,28,616 (24.28 lakh) active cases. India is going through a tough phase and we all need to stay united.",
        },
        {
            date: "30-04-2021",
            content:
                "The new variant of Covid has brought some new symptoms with it.New symptoms observed in patients are a pain in the abdomen, loose motion, sudden headache, Conjunctivitis and brain fog. And few patients reported auditory and vestibular problems as other symptoms. We should always remember the old symptoms: fever, muscle pain or body ache, loss of smell and taste, sudden chills, breathlessness, extreme fatigue, painful sore throat, etc. If you ever experience any of these symptoms please reach out to hospitals for help. The country is bewildered with 1,761 COVID deaths in a single day.",
        },
        {
            date: "30-04-2021",
            content:
                "There is a shortage of oxygen in Delhi hospitals and Delhites are struggling to survive amidst the attack of the second wave of Coronavirus. People are rushing towards Punjab to look for beds and oxygen cylinders. As there are no beds and oxygen cylinders in the capital to meet the rising demand.",
        },
        {
            date: "30-04-2021",
            content:
                "Sikhs come as rescuers for the Delhi people struggling for oxygen. Khalsa Aid has declared to provide free oxygen concentrators to people with low oxygen levels. There is online registration for this to avoid any physical contact and people with the lowest oxygen level will be attended on a priority basis. They have to attach their medical prescription and a picture of oximeter readings will be needed along with other formalities and a concentrator will be issued for a week. Please feel free to contact Khalsa Aid in case of need of oxygen.",
        },
    ];
    ngAfterViewInit() {
        $(".news").bootstrapNews({
            newsPerPage: 3,
            autoplay: true,
            pauseOnHover: true,
            direction: "up",
            newsTickerInterval: 6000,
        });
    }
    socialshareed = false;

    onShowShare() {
        this.socialshareed = !this.socialshareed;
    }
}
