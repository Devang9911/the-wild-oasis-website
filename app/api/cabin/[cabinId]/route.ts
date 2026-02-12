import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/services";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ cabinId: string }> }
) {
  const { cabinId } = await params;

  const numericId = Number(cabinId);

  if (isNaN(numericId)) {
    return Response.json({ message: "Invalid cabin id" }, { status: 400 });
  }

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(numericId),
      getBookedDatesByCabinId(numericId),
    ]);

    if (!cabin) {
      return Response.json({ message: "Cabin not found" }, { status: 404 });
    }

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
