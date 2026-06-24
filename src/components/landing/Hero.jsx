import Button from "../ui/Button";

const heroImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuB7JDpySi9TwuPctvSQtGU7SZ1zkKIoZXePkGGhGnEuPvB8I6KfE5DfCsuH997BGR36JPfnN_tlrNTlu6jN1xukI5TvGanMV9-flq6vrbnBgC2rWAnBuUR20ZwTvUCvfpQlXBPg-AryBIj_eAzCfC1pFVvBglDRDGNtHbLyuBG5T1p5PMwDMCDdUSVq61X-x8iWJum-sKze1KdpaOQ7fvPoPanbLdTUPSKlwqly_3a5laA0P8SvNvexaKTbuCle4fO3-Lonw75Ro2M";
const heartImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuAgBN_e3vFITOMTTr1l25w2-1jbMVHNF2z1TjNYyRJPSByoFZgKPPE2nCWCt7KqDinvyf7asxgIlQ9ptH5truppUfrIfoW0sQNL-SdxZOVwPlH8Axv7SOtqtj9ox8bfxSLwDd84IUH1XRk6gva0C_G1i7m6CpZj8rdXFnCGWXIf5fwMCHcjEA7lA7TwXKeBZqOdVS_qOuphgSqhJix8LfK85UY2gfw1L2IAIuigLMscdwyzpOdnI_tfPBh6vICZfn6X4bvCahbOplY";
const walkImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDDLa7W3uilLAPLjuWPdAiArwQ0_AUCMilxD1nxiR3f-qZk-xhfc_-fdTO1LB3lrgIWaLvD7mU2beScZ_iv0CIvdHxKtpDXruzc9heroLV-RgGIuoOkpfTqQAwJxPJLkFYnIm7A71T2OgGoOmaeVj9qv2XZ-yHFptScb9F4usaeqgORY7Nj3lfOf7DoJ8nnomG_Zxc-twFSJ9AcKsH9X22QDeu9ydkG4S5EqUzURHhgRgtOMEghsWeKt9PSA_j5R1hRRdmGfErUQfE";

export default function Hero() {
  return (
    <section className="relative min-h-[921px] flex items-center pt-24 pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="bg-cover bg-center w-full h-full opacity-40" style={{ backgroundImage: `url('${heroImg}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 max-w-2xl">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            — Sri Lanka's Premier Blind Dating Experience
          </span>
          <h1 className="font-display-lg text-display-lg text-on-background">
            Where <span className="text-gradient italic">Mystery</span> Becomes Connection
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Attend curated real-world dating events where your match is revealed in person.
            No algorithms to swipe, no faces to judge — just the thrill of genuine discovery.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="primary" icon="arrow_forward">Explore Event</Button>
            <Button variant="outlinePrimary">Create Profile</Button>
          </div>
        </div>

        <div className="hidden lg:block relative h-[600px] w-full">
          <div className="absolute top-0 right-10 w-64 h-80 rounded-xl overflow-hidden glass-panel transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
            <img src={heartImg} alt="Hands forming a heart at sunset" className="object-cover w-full h-full opacity-80" />
          </div>
          <div className="absolute bottom-10 left-0 w-72 h-96 rounded-xl overflow-hidden glass-panel transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
            <img src={walkImg} alt="Couple walking on the beach at sunset" className="object-cover w-full h-full opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
}