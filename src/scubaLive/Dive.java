package scubaLive;

public class Dive {
	
	private Plan planref;
	private int bottomt;
	private int depth;
	private int ndepth;
	private char spg;
	private char fpg;
	private boolean ssrequired;
	private boolean safe;

	public Dive(Plan plan) {
		this.planRef = plan;
		bottomt = 0;
		depth = 0;
		ndepth = 0;
		spg = 'a';
		fpg = 'a';
		ssrequired = false;
		safe = true;
	}
	
	public int[] updateDive(int time, int depth) {
		
		
	}
	
	public boolean isSafe() {
		
	}
	
	private int[] recommend() {
		
	}
	
	private int timeAtDepth(char pg) {
		
	}

	private int depthAtTime(char pg) {
		
	}
	
}
