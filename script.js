document.addEventListener('DOMContentLoaded', () => {
    const quizScreen = document.getElementById('quizScreen');
    const resultsScreen = document.getElementById('resultsScreen');
    const quizForm = document.getElementById('quizForm');
    const submitQuizButton = document.getElementById('submitQuiz');
    const correctAnswersSpan = document.getElementById('correctAnswers');
    const wrongAnswersSpan = document.getElementById('wrongAnswers');
    const correctionsDiv = document.getElementById('corrections');
    const restartQuizButton = document.getElementById('restartQuiz');

    // Mantenha as perguntas exatamente como estão
    const questions = [
        {
            question: "Quando a Faculdade Municipal de Palhoça (FMP) foi fundada?",
            options: ["25 de outubro de 2005", "20 de abril de 2006", "15 de maio de 2000", "01 de janeiro de 2010"],
            answer: "25 de outubro de 2005"
        },
        {
            question: "A FMP é uma instituição de ensino:",
            options: ["Privada e paga", "Pública e paga", "Privada e gratuita", "Pública e gratuita"],
            answer: "Pública e gratuita"
        },
        {
            question: "Qual o curso de graduação mais antigo oferecido pela FMP?",
            options: ["Análise e Desenvolvimento de Sistemas", "Pedagogia", "Administração", "Processos Gerenciais"],
            answer: "Administração"
        },
        {
            question: "Qual a avaliação máxima que a FMP pode receber do MEC?",
            options: ["3", "4", "5", "6"],
            answer: "5"
        },
        {
            question: "Qual o nome do município onde a FMP está localizada?",
            options: ["São José", "Florianópolis", "Palhoça", "Biguaçu"],
            answer: "Palhoça"
        },
        {
            question: "Além de graduação, a FMP oferece cursos de:",
            options: ["Ensino Médio", "Educação Infantil", "Pós-graduação", "Cursos Técnicos"],
            answer: "Pós-graduação"
        },
        {
            question: "A FMP é mantida por qual esfera do governo?",
            options: ["Federal", "Estadual", "Municipal", "Particular"],
            answer: "Municipal"
        },
        {
            question: "Qual dos seguintes cursos é de tecnologia (tecnólogo) na FMP?",
            options: ["Pedagogia", "Administração", "Análise e Desenvolvimento de Sistemas", "Direito"],
            answer: "Análise e Desenvolvimento de Sistemas"
        },
        {
            question: "Qual o objetivo principal da FMP, de acordo com sua missão?",
            options: ["Gerar lucro", "Formar profissionais críticos", "Ser a maior faculdade do estado", "Oferecer cursos online"],
            answer: "Formar profissionais críticos"
        },
        {
            question: "Que tipo de certificado os alunos de graduação da FMP recebem?",
            options: ["Técnico", "Licenciatura ou Bacharelado/Tecnólogo", "Mestrado", "Doutorado"],
            answer: "Licenciatura ou Bacharelado/Tecnólogo"
        },
        {
            question: "Quantos anos duram, em média, os cursos de graduação da FMP?",
            options: ["2 a 4 anos", "4 a 5 anos", "1 ano", "6 a 7 anos"],
            answer: "2 a 4 anos"
        },
        {
            question: "A FMP possui um processo seletivo para ingresso? Se sim, qual?",
            options: ["Não, é só se matricular", "Vestibular próprio ou ENEM", "Entrevista", "Sorteio"],
            answer: "Vestibular próprio ou ENEM"
        },
        {
            question: "Qual a missão da FMP em relação ao desenvolvimento?",
            options: ["Apenas econômico", "Apenas social", "Sustentável", "Apenas educacional"],
            answer: "Sustentável"
        },
        {
            question: "Um dos cursos de pós-graduação oferecidos pela FMP é:",
            options: ["Medicina", "Engenharia Civil", "Psicopedagogia", "Arquitetura"],
            answer: "Psicopedagogia"
        },
        {
            question: "Qual o status da FMP junto ao Ministério da Educação (MEC)?",
            options: ["Não credenciada", "Em processo de credenciamento", "Credenciada", "Apenas reconhecida regionalmente"],
            answer: "Credenciada"
        },
        {
            question: "A estrutura da FMP é geralmente considerada pelos alunos como:",
            options: ["Luxuosa", "Simples, mas funcional", "Inexistente", "Exclusivamente virtual"],
            answer: "Simples, mas funcional"
        },
        {
            question: "Professores da FMP são frequentemente:",
            options: ["Apenas com ensino médio", "Apenas com graduação", "Mestres e doutores", "Apenas com curso técnico"],
            answer: "Mestres e doutores"
        },
        {
            question: "A FMP busca formar profissionais:",
            options: ["Conformistas", "Apenas teóricos", "Críticos e reflexivos", "Sem opinião"],
            answer: "Críticos e reflexivos"
        },
        {
            question: "Qual era um curso de graduação que a FMP oferecia no passado, mas não mais?",
            options: ["Engenharia de Produção", "Gestão de Turismo", "Ciência da Computação", "Jornalismo"],
            answer: "Gestão de Turismo"
        },
        {
            question: "A FMP contribui para a educação superior de Palhoça por ser:",
            options: ["A única opção", "Uma opção pública e gratuita", "A mais cara", "A mais distante"],
            answer: "Uma opção pública e gratuita"
        }
    ];

    // Função para carregar as perguntas no HTML
    function loadQuestions() {
        quizForm.innerHTML = ''; // Limpa qualquer conteúdo existente
        questions.forEach((q, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');

            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionBlock.appendChild(questionText);

            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');

            // Embaralha as opções para cada pergunta
            const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

            shuffledOptions.forEach((option) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${index}`;
                input.value = option;
                input.required = true;

                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                optionsDiv.appendChild(label);
            });

            questionBlock.appendChild(optionsDiv);
            quizForm.appendChild(questionBlock);
        });
    }

    // Função para exibir os resultados e correções
    function showResults() {
        let correctCount = 0;
        let wrongCount = 0;
        correctionsDiv.innerHTML = '<h3>Correção das Questões</h3>'; // Limpa correções anteriores

        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            let userAnswer = "Não respondida";

            if (selectedOption) {
                userAnswer = selectedOption.value;
                if (selectedOption.value === q.answer) {
                    correctCount++;
                } else {
                    wrongCount++;
                    const correctionItem = document.createElement('div');
                    correctionItem.classList.add('correction-item');
                    correctionItem.innerHTML = `
                        <strong>Questão ${index + 1}:</strong> ${q.question}<br>
                        Sua Resposta: <span class="your-answer">${userAnswer}</span><br>
                        Resposta Correta: <span class="correct-answer">${q.answer}</span>
                    `;
                    correctionsDiv.appendChild(correctionItem);
                }
            } else {
                wrongCount++;
                const correctionItem = document.createElement('div');
                correctionItem.classList.add('correction-item');
                correctionItem.innerHTML = `
                    <strong>Questão ${index + 1}:</strong> ${q.question}<br>
                    Sua Resposta: <span class="your-answer">${userAnswer}</span><br>
                    Resposta Correta: <span class="correct-answer">${q.answer}</span>
                `;
                correctionsDiv.appendChild(correctionItem);
            }
        });

        correctAnswersSpan.textContent = correctCount;
        wrongAnswersSpan.textContent = wrongCount;

        quizScreen.classList.add('hidden'); // Esconde a tela do quiz
        resultsScreen.classList.remove('hidden'); // Mostra a tela de resultados
    }

    // MUDANÇA AQUI: O evento agora é no 'click' do botão, não no 'submit' do formulário
    submitQuizButton.addEventListener('click', () => { // Removido 'event' como parâmetro, pois não precisamos de event.preventDefault() aqui
        // Valida se todas as perguntas foram respondidas
        const allQuestionsAnswered = questions.every((q, index) => {
            return document.querySelector(`input[name="question${index}"]:checked`);
        });

        if (!allQuestionsAnswered) {
            alert('Por favor, responda a todas as perguntas antes de finalizar o quiz.');
            return; // Impede que a função showResults seja chamada
        }

        showResults();
    });

    // Event listener para recomeçar o quiz (mantém o mesmo)
    restartQuizButton.addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        quizForm.reset();
        loadQuestions();
        window.scrollTo(0, 0);
    });

    // Carregar as perguntas quando a página é carregada
    loadQuestions();
});