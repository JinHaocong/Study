// sign 条件类型约束

interface Unknown {
    message: unknown
}

// error Type "message" cannot be used to index type T
// type MessageOf111<T> = T['message']

type MessageOf112<T extends Unknown> = T['message']

type MessageOf113<T> = T extends Unknown ? T['message'] : never

interface Email {
    message: string
}

interface Dog {
    bark(): void
}

// type EmailMessageContents = string
type EmailMessageContents = MessageOf113<Email>
const emc: EmailMessageContents = 'jhc...'


// type EmailMessageContents = never
type DogMessageContents = MessageOf113<Dog>
const dmc: DogMessageContents = 'error' as never


// sign
type Flatten<T> = T extends any[] ? T[number] : T

// type Str = string
type Str = Flatten<string[]>

// type Num = number
type Num = Flatten<number>
