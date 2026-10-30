import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="landing-gilroy relative z-10 mt-16 lg:mt-[130px] bg-cerrado-900 pb-10">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="relative overflow-hidden rounded-[30px] text-white p-[60px]">
          <div className="grid lg:grid-cols-[1.7fr_2.3fr] gap-10 mb-12">
            <div>
              <div className="h-[30.4px] mb-5 flex items-center transition-opacity duration-300 hover:opacity-85">
                <Image
                  src="/logo/logo.png"
                  alt="Pequi"
                  width={160}
                  height={40}
                  className="h-[32px] w-auto"
                />
              </div>
              <p className="w-full max-w-[27.375rem] text-white/72 text-[0.95rem] font-normal leading-[1.5rem] tracking-[-0.00938rem]">
                Como no pequi, o Direito tem espinhos por dentro: nossa IA ajuda você a evitá-los
                com segurança.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-10">
              <div>
                <h4 className="mb-5 text-white text-[0.825rem] font-medium leading-[1.25rem] tracking-[0.0875rem] uppercase">Produtos</h4>
                <ul className="space-y-3 text-white/65 text-[0.92rem] font-normal leading-[1.25rem] tracking-[-0.00938rem] [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:text-white [&_a:hover]:translate-x-1 [&_a]:inline-block">
                  <li><Link href="/assistant">Assistentes de IA</Link></li>
                  <li><Link href="/vault">Acesso ao Cofre</Link></li>
                  <li><Link href="/knowledge">Base de Conhecimento</Link></li>
                  <li><Link href="/workflows">Automações</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-5 text-white text-[0.825rem] font-medium leading-[1.25rem] tracking-[0.0875rem] uppercase">Plataforma</h4>
                <ul className="space-y-3 text-white/65 text-[0.92rem] font-normal leading-[1.25rem] tracking-[-0.00938rem] [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:text-white [&_a:hover]:translate-x-1 [&_a]:inline-block">
                  <li><Link href="/#hero">Plataforma</Link></li>
                  <li><Link href="/#features">Recursos</Link></li>
                  <li><Link href="/#why">Por que nós</Link></li>
                  <li><Link href="/#testimonials">Depoimentos</Link></li>
                  <li><Link href="/#faq">Perguntas frequentes</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-5 text-white text-[0.825rem] font-medium leading-[1.25rem] tracking-[0.0875rem] uppercase">Empresa</h4>
                <ul className="space-y-3 text-white/65 text-[0.92rem] font-normal leading-[1.25rem] tracking-[-0.00938rem] [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:text-white [&_a:hover]:translate-x-1 [&_a]:inline-block">
                  <li><Link href="/customers">Clientes</Link></li>
                  <li><Link href="/security">Segurança</Link></li>
                  <li><Link href="/company">Sobre nós</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-5 text-white text-[0.825rem] font-medium leading-[1.25rem] tracking-[0.0875rem] uppercase">Conecte-se</h4>
                <ul className="space-y-4">
                  <li className="pt-2">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/65 text-[0.92rem] font-normal leading-[1.25rem] tracking-[-0.00938rem] transition-all duration-300 hover:text-white hover:-translate-y-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <g clipPath="url(#linkedinClip)">
                          <path d="M13.6313 13.6347H11.262V9.922C11.262 9.03667 11.244 7.89733 10.0273 7.89733C8.792 7.89733 8.60333 8.86067 8.60333 9.85667V13.6347H6.234V6H8.51V7.04067H8.54067C8.85867 6.44067 9.632 5.80733 10.7873 5.80733C13.188 5.80733 13.632 7.38733 13.632 9.444L13.6313 13.6347ZM3.558 4.95533C2.79533 4.95533 2.18267 4.338 2.18267 3.57867C2.18267 2.82 2.796 2.20333 3.558 2.20333C4.318 2.20333 4.934 2.82 4.934 3.57867C4.934 4.338 4.31733 4.95533 3.558 4.95533ZM4.746 13.6347H2.37V6H4.746V13.6347ZM14.8167 0H1.18067C0.528 0 0 0.516 0 1.15267V14.8473C0 15.4847 0.528 16 1.18067 16H14.8147C15.4667 16 16 15.4847 16 14.8473V1.15267C16 0.516 15.4667 0 14.8147 0H14.8167Z" fill="white" fillOpacity="0.65" />
                        </g>
                        <defs>
                          <clipPath id="linkedinClip">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/65 text-[0.92rem] font-normal leading-[1.25rem] tracking-[-0.00938rem] transition-all duration-300 hover:text-white hover:-translate-y-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M5.52671 13.5006C10.558 13.5006 13.31 9.33197 13.31 5.7173C13.31 5.59864 13.31 5.48064 13.302 5.36397C13.8375 4.97632 14.2996 4.49638 14.6667 3.94664C14.1674 4.16797 13.6377 4.31315 13.0954 4.3773C13.6665 4.03534 14.0939 3.49754 14.298 2.86397C13.7612 3.18256 13.1738 3.40712 12.5614 3.52797C12.149 3.08915 11.6034 2.79853 11.0091 2.70111C10.4149 2.60369 9.80505 2.7049 9.27412 2.98908C8.74319 3.27326 8.32076 3.72455 8.07224 4.27308C7.82371 4.8216 7.76295 5.43676 7.89937 6.0233C6.81177 5.9688 5.74778 5.68619 4.77647 5.19382C3.80517 4.70145 2.94826 4.01032 2.26137 3.1653C1.91159 3.76744 1.80443 4.48025 1.96173 5.15861C2.11903 5.83698 2.52895 6.42989 3.10804 6.81664C2.67288 6.80404 2.24713 6.68697 1.86671 6.4753V6.50997C1.86697 7.1415 2.08564 7.75351 2.48564 8.24221C2.88564 8.73091 3.44235 9.06623 4.06137 9.1913C3.65858 9.30111 3.23597 9.31708 2.82604 9.23797C3.00081 9.78162 3.34116 10.257 3.79946 10.5977C4.25776 10.9384 4.81109 11.1273 5.38204 11.138C4.81479 11.5837 4.16523 11.9132 3.47052 12.1077C2.77582 12.3021 2.04959 12.3577 1.33337 12.2713C2.58444 13.0742 4.04017 13.5 5.52671 13.498" fill="white" fillOpacity="0.65" />
                      </svg>
                      <span>Twitter</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/12 pt-7 mt-2 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/65 text-sm text-center md:text-left">
              Copyright © {new Date().getFullYear()} Pequi. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-white/65 text-[0.92rem] font-normal leading-[1.25rem] tracking-[-0.00938rem] [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:text-white [&_a:hover]:-translate-y-0.5 [&_a]:inline-block">
              <Link href="/terms">Termos de Serviço</Link>
              <Link href="/privacy-policy">Política de Privacidade</Link>
              <Link href="/cookies">Política de Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 