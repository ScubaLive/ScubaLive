package scubaLive;

public class Note {
	
	String notes;
	String date;
	String location;
	
	public Note() {
		this.notes = "";
		this.date = "";
		this.location = "";
	}
	
	public Note(String notes, String date, String location) {
		this.notes = notes;
		this.date = date;
		this.location = location;
	}
	
	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}
