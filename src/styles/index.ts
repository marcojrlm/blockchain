import styled from 'styled-components';

export const Block = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isInvalidBlock',
})<{ isInvalidBlock?: boolean }>`
    width: 50vw;
    background: ${props => props?.isInvalidBlock ? 'red' : "#086788"};
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: auto;
    border-radius: .5rem;
`;

export const Blockchain = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5rem auto;
    justify-content: center;
    align-content: center;
    gap: 5rem;
`;

export const Input = styled.input<{ $block?: boolean }>`
    border: 1px solid #1CCAD8;
    width: 100%;
    outline: none;
    background-color: ${props => props?.$block ? '#D1D1D1' : "#FFF"};
    padding: .5rem;
    border-radius: .5rem;
    pointer-events: ${props => props?.$block ? 'none' : "auto"};

    :active, :focus {
        outline: none;
        border: 1px solid #1CCAD8;
    }

    :disabled {
        cursor: not-allowed;
    }
`;

export const Button = styled.button`
    background: #03254E;
    padding: .8rem;
    color: #FFF;
    outline: none;
    border: none;
    border-radius: .5rem;
    width: 100%;
`

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`

export const Label = styled.label`
    width: 25%;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
        text-align: center;
    }
`;

export const Skeleton = styled.div`
    width: 100%;
    height: 2rem;
    background-color: #b5b3b3;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 150%;
        height: 100%;
        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9), transparent);
        animation: loading 1s infinite linear; /* Aumenta a velocidade da animação */
    }

    @keyframes loading {
        100% {
            left: 100%;
        }
    }
`;

export const Trash = styled.span`
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    color: red;
    cursor: pointer;
`;