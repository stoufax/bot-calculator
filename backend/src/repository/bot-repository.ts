import Bot from "../model/bot.model";

export async function getBotResultCalculation(limit: number): Promise<any[]> {
  return await Bot.find().sort("-createdAt").limit(limit).exec();
}

export async function addBotResultCalculation(
  calculatedOperation: number
): Promise<any> {
  return await Bot.create({ calculatedOperation });
}
